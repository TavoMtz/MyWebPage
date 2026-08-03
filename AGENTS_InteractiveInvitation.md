# AGENTS.md

## Propósito del proyecto
Este repositorio contiene una invitación web interactiva para una boda, desarrollada con Flask y SQLite. La aplicación muestra la información del evento, permite interactuar con una interfaz temática y registra la asistencia de los invitados.

## Contexto general
- El proyecto está pensado como una web estática con un backend mínimo.
- La lógica principal vive en app.py.
- Los templates HTML se encuentran en templates/.
- Los recursos estáticos se encuentran en static/.
- La base de datos usada es SQLite y el archivo es boda.db.

## Stack principal
- Python 3
- Flask
- SQLite3
- HTML, CSS y JavaScript vanilla
- particles.js (cargado desde CDN)

## Estructura del proyecto
- app.py: archivo principal de la aplicación Flask. Aquí se definen las rutas, la inicialización de la base de datos y la lógica de confirmación.
- templates/: contiene las vistas HTML:
  - index.html: página principal de la invitación.
  - confirmado.html: vista mostrada cuando el invitado ya estaba registrado.
  - gracias.html: vista mostrada tras registrar correctamente a un invitado.
- static/: contiene los archivos estáticos:
  - index.css
  - index.js
  - particles.json
  - img/
- boda.db: base de datos SQLite con la tabla invitados.

## Reglas de negocio importantes
- La ruta principal "/" debe renderizar la invitación.
- La ruta "/confirmar" acepta peticiones POST desde el formulario de confirmación.
- El formulario debe capturar:
  - nombre
  - asistencia
  - mensaje
- Antes de insertar un nuevo registro, se debe verificar si el nombre ya existe en la base de datos para evitar duplicados.
- Si el invitado ya existe, la aplicación debe mostrar la plantilla confirmado.html.
- Si no existe, se inserta el registro y se muestra gracias.html.

## Base de datos
La base de datos debe mantener una tabla llamada invitados con al menos estas columnas:
- id: entero autoincrementable
- nombre: texto obligatorio
- asistencia: texto obligatorio
- mensaje: texto opcional

## Requisitos para trabajar en este proyecto
- Mantener la compatibilidad con Flask.
- No romper las rutas existentes ni los nombres de los templates.
- Si se modifican rutas o nombres de archivos, actualizar también las referencias desde el código.
- Preferir cambios pequeños y claros.
- Mantener el estilo visual del proyecto y no introducir cambios bruscos de UX sin razón.
- Evitar depender de paquetes adicionales si no son estrictamente necesarios.

## Comandos de ejecución
Para correr la aplicación localmente:
- python app.py
- Luego abrir el navegador en: http://127.0.0.1:5000/

## Convenciones de desarrollo
- Mantener el código legible y bien comentado cuando sea necesario.
- Usar nombres descriptivos para variables y funciones.
- Evitar reescribir lógica innecesariamente.
- Si se agregan nuevas rutas, mantener el patrón Flask tradicional con @app.route.
- Si se agregan nuevas vistas, colocarlas en templates/ y referenciarlas con render_template.
- Si se agregan recursos nuevos, colocarlos en static/ y usarlos desde los templates.

## Consideraciones especiales
- El proyecto no parece usar un entorno virtual configurado explícitamente, por lo que es recomendable trabajar con Python estándar y Flask instalado en el entorno activo.
- El flujo actual es simple y depende de archivos locales; evitar cambios que requieran infraestructura externa.
- El comportamiento de la aplicación es sensible al contenido del formulario y a la base de datos, así que cualquier cambio debe probarse manualmente en el navegador.

## Objetivo para agentes de IA
Cuando se trabaje sobre este proyecto, priorizar:
1. Preservar el funcionamiento actual.
2. Mantener la experiencia visual y temática de la invitación.
3. Implementar cambios de forma mínima y segura.
4. Documentar cualquier cambio relevante en el código o en la lógica del flujo.
