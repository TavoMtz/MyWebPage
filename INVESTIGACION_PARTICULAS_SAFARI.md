# Investigación: partículas que desaparecen de forma intermitente en Safari

**Estado:** corrección implementada y probada en el repositorio local. Falta validación en un dispositivo Apple real y en la URL desplegada.

## Síntoma reportado

En Safari las partículas del hero pueden aparecer en una carga y desaparecer tras recargar. También pueden faltar en la primera visita. El problema no es solamente que la animación se detenga: el `canvas` puede quedar completamente vacío.

## Arquitectura actual

El fondo se crea con la copia local de `particles.js 2.0.0` (`src/lib/vendor/particles.js`). La página inicializa dos instancias desde `src/lib/hero-particles.js`:

- `#particles-js` en el hero.
- `#contact-particles` en la sección de contacto.

La librería crea un `<canvas>`, pinta las partículas y empieza un ciclo de `requestAnimationFrame`. El inicializador propio decide después si debe animar o mostrar una imagen estática, según visibilidad, movimiento reducido y la pausa manual.

## Hallazgos confirmados

### 1. La librería empezaba a animar antes de que el código propio tomara control

`particles.js` inicia su ciclo de dibujo dentro de `particlesJS()`. Esto sucede antes de que se conecten los observadores de tamaño y visibilidad de `hero-particles.js`.

En Safari, durante una carga o restauración de página, el contenedor puede informar temporalmente un ancho o alto igual a `0`. Antes de la corrección, en ese caso el inicializador propio terminaba pronto, pero el ciclo que ya había empezado la librería seguía activo. El canvas quedaba con un búfer de `0 × 0` y dependía de un evento posterior para recuperarse. Esa recuperación no era fiable en la secuencia de carga observada.

La prueba `a zero-size initial layout does not leave the vendor animation running` reprodujo este estado y fallaba antes de la corrección.

### 2. Cambiar las dimensiones del canvas borra su contenido

Asignar `canvas.width` o `canvas.height` borra el búfer de dibujo. Esto ocurre al cambiar la barra de direcciones de Safari móvil, al rotar la pantalla y durante ciertos recalculos de viewport.

La versión anterior del código podía depender del siguiente `requestAnimationFrame` para volver a dibujar. Si Safari aplaza ese frame por restauración, pestaña oculta o movimiento reducido, el canvas puede quedarse vacío aunque las partículas sigan existiendo en memoria.

### 3. Los estados pausados necesitaban una ruta de recuperación explícita

Cuando el usuario pausa la animación, el sistema tiene movimiento reducido, o la pestaña vuelve de segundo plano, no siempre existe un ciclo de animación que vuelva a pintar el canvas. También faltaba una ruta defensiva ante una restauración de contexto del canvas.

## Corrección aplicada

En `src/lib/hero-particles.js` se aplicaron estas medidas:

1. Se cancela inmediatamente el ciclo inicial de la librería y se desactiva el movimiento hasta saber que el contenedor tiene dimensiones válidas.
2. Se mide el contenedor y se espera a que tenga ancho y alto mayores que cero antes de permitir el dibujo o la animación.
3. `ResizeObserver` y `visualViewport.resize` sincronizan el tamaño del canvas cuando Safari cambia el viewport.
4. Cada redimensión vuelve a crear las partículas necesarias y pinta de forma síncrona; no depende del siguiente frame de animación.
5. `visibilitychange`, `pageshow` y `load` vuelven a sincronizar y pintar el canvas al regresar a la página.
6. Los eventos `contextlost` y `contextrestored` detienen el dibujo durante la pérdida y recrean el contexto y la imagen al recuperarlo.
7. Se mantiene una imagen estática cuando hay movimiento reducido o la animación está pausada.
8. Se conserva la estética móvil, con un mínimo visible de 32 partículas en el hero y 12 en contacto, para evitar que la densidad calculada reduzca el fondo hasta casi desaparecer.
9. Se cambió el parámetro de versión del script en `index.html` a `particle-startup-recovery-2`, de modo que un navegador no reutilice la versión anterior desde caché tras el despliegue.

## Pruebas realizadas

Se añadió `tests/particle-lifecycle.test.cjs`, que ejecuta la librería vendorizada y el inicializador real en un entorno controlado.

La orden ejecutada fue:

```powershell
node --test tests/particle-lifecycle.test.cjs
```

Resultado: **4 de 4 pruebas correctas**.

Las pruebas cubren:

- 100 cargas iniciales con distintos `devicePixelRatio` y movimiento reducido alternado: se pinta una imagen estática antes de recibir el resultado del `IntersectionObserver`.
- Inicio con tamaño `0 × 0` y recuperación posterior: no queda activo el ciclo de la librería y el canvas se pinta cuando obtiene tamaño.
- Pérdida y restauración del contexto: se recupera una imagen estática incluso con movimiento reducido.
- Redimensión, pausa manual, pestaña oculta y `pageshow`: se conserva una única animación activa o una imagen estática cuando corresponde.

También pasaron `node --check src/lib/hero-particles.js`, `git diff --check` y el detector de implementación visual del proyecto.

## Lo que aún no está confirmado

Las pruebas simulan los eventos del navegador; no ejecutan el compositor ni WebKit de Safari. Por eso demuestran que el ciclo de vida de nuestro código es coherente, pero no sustituyen una prueba física.

No se proporcionó la URL donde aparece el problema. Sin ella no fue posible comprobar si Safari está recibiendo el commit `d42943f` (`Trying safaris problem`) o una versión antigua almacenada en caché.

## Validación recomendada en un Mac con Safari

Usar Safari en macOS es la forma más fiel de investigar el problema. Si se dispone de un iPhone, Safari para macOS puede inspeccionarlo remotamente a través del menú **Develop**.

Con la versión desplegada, comprobar en este orden:

1. Abrir la página desde una pestaña nueva y esperar dos segundos.
2. Recargar la página al menos diez veces, usando tanto recarga normal como recarga sin caché desde las herramientas de desarrollo.
3. Consultar el elemento `#particles-js canvas`: debe tener dimensiones mayores que cero y partículas en `window.pJSDom[0].pJS.particles.array`.
4. Poner Safari en segundo plano y volver a la página.
5. En iPhone: contraer y expandir la barra de direcciones, girar a horizontal y regresar a vertical.
6. Activar **Reduce Motion** y comprobar que el fondo queda estático, pero visible.
7. Pulsar “Pausar animación” y “Reanudar animación”, comprobando que el fondo nunca desaparece.

Si vuelve a ocurrir, capturar la consola y estos valores del inspector remoto:

```js
const canvas = document.querySelector('#particles-js canvas');
({
  cssWidth: canvas?.offsetWidth,
  cssHeight: canvas?.offsetHeight,
  bufferWidth: canvas?.width,
  bufferHeight: canvas?.height,
  particles: window.pJSDom?.[0]?.pJS?.particles?.array?.length
});
```

Un ancho o alto igual a cero indicará un problema de layout/viewport. Un canvas con dimensiones válidas y cero partículas indicará un fallo de inicialización. Dimensiones y partículas válidas con un canvas vacío orientarán la siguiente investigación al renderizado de WebKit o a una capa CSS.

## Conclusión

La causa más probable del fallo intermitente era una condición de carrera de inicio: `particles.js` iniciaba un canvas antes de que el contenedor tuviera tamaño estable, y el código de recuperación no forzaba un repintado fiable en todos los estados de Safari. La corrección elimina esa dependencia, cubre los eventos de restauración y cuenta con pruebas de regresión. La validación final debe hacerse en Safari de macOS o en un iPhone usando la versión desplegada.
