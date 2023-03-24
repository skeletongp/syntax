
# Syntaxt

Syntaxt es una aplicación móvil que permite a los usuarios registrar tareas básicas y organizarlas de manera efectiva. La aplicación está diseñada para ser intuitiva, fácil de usar y atractiva visualmente, con una interfaz limpia, moderna y elegante que destaca por su simplicidad y funcionalidad. 

## Tecnologías utilizadas

En el desarrollo de la aplicación móvil se han utilizado diversas tecnologías y herramientas para lograr una experiencia de usuario atractiva, funcional y escalable, entre ellas:

- Ionic Framework (Ionic/Vue) v6
- Capacitor v4.7
- Ant Design
- Tailwind CSS
- Chart.js
- Pinia
- SQLite
- Plugins de Capacitor

## Estructura de la base de datos

La aplicación utiliza una estructura de tablas relacionales para el manejo de los datos, gracias al uso de SQLite. A continuación, se describe cada tabla utilizada en la aplicación:

### Tabla usuarios (Users)

Esta tabla almacena la información de los usuarios que utilizan la aplicación móvil, incluyendo su nombre, correo electrónico, nombre de usuario y contraseña. Además, cuenta con dos campos adicionales: `timestamps` para el registro de la fecha de creación y actualización de los registros, y `softdeletes` para el registro de la fecha de eliminación lógica de los registros eliminados.

### Tabla tareas (Tasks)

Esta tabla almacena la información de las tareas registradas en la aplicación móvil, incluyendo el título de la tarea, su descripción, estado, prioridad, fecha y hora de vencimiento, fecha de completado (si se ha completado), notas y el identificador del usuario propietario de la tarea. Además, cuenta con dos campos adicionales: `timestamps` para el registro de la fecha de creación y actualización de los registros, y `softdeletes` para el registro de la fecha de eliminación lógica de los registros eliminados.

### Tabla fotos (Photos)

Esta tabla almacena las fotos adjuntas a las tareas registradas en la aplicación móvil, incluyendo el título de la foto, su ubicación y el identificador de la tarea a la que pertenece. Además, cuenta con dos campos adicionales: `timestamps` para el registro de la fecha de creación y actualización de los registros, y `softdeletes` para el registro de la fecha de eliminación lógica de los registros eliminados.

### Tabla subtareas (Subtasks)

Esta tabla está pensada para nuevas versiones de la aplicación, aunque no fue utilizada en la versión actual. Esta tabla almacena información sobre las subtareas que pueden ser asociadas a las tareas principales. Cada registro de esta tabla contiene información sobre el título de la subtarea, su estado, fecha de vencimiento, fecha de completado (si se ha completado), notas y el identificador de la tarea principal a la que pertenece. Además, cuenta con dos campos adicionales: `timestamps` para el registro de la fecha de creación y actualización de los registros.

### Tabla tarea-etiqueta (Tagtasks)

Esta tabla está pensada para nuevas versiones de la aplicación, aunque no fue utilizada en la versión actual. Esta tabla almacena la relación entre
### Tabla etiquetas (Tags)

Esta tabla está pensada para nuevas versiones de la aplicación, aunque no fue utilizada en la versión actual. Esta tabla almacena información sobre las etiquetas que pueden ser asociadas a las tareas principales. Cada registro de esta tabla contiene información sobre el nombre de la etiqueta. Además, cuenta con dos campos adicionales: `timestamps` para el registro de la fecha de creación y actualización de los registros.

## Funcionalidades y casos de uso

La aplicación cuenta con una serie de funcionalidades principales que permiten a los usuarios crear, editar y organizar sus tareas de manera efectiva. Entre ellas, destacan:

- Creación de tareas
- Edición de tareas
- Eliminación (lógica) de tareas
- Marcado de tareas como completadas, canceladas o pendientes
- Añadir fotos a tareas
- Ver resumen general y progreso de las tareas en el período seleccionado (vista principal)
- Ver listado de tareas con carga diferida
- Ver estadísticas generales
- Ver tareas del hoy, de la semana y del mes
- Registro de varios usuarios con autenticación biométrica
- Cerrar sesión
## Requerimientos

Antes de iniciar el desarrollo de la aplicación, es necesario contar con las siguientes herramientas instaladas en el equipo de desarrollo:

- Node.js (v14 o superior)
- npm (v8 o superior)
- Ionic Framework (v6 o superior)
- Capacitor (v4 o superior)

## Agradecimientos

Agradecemos a todos los desarrolladores de las tecnologías utilizadas en la creación de esta aplicación, así como a la comunidad de desarrolladores y diseñadores que comparten sus conocimientos y recursos en línea. 

## Clonar el repositorio

Para clonar el repositorio y utilizar la aplicación en su equipo local, siga los siguientes pasos:

1. Abra una terminal en su equipo de desarrollo y navegue hasta el directorio donde desea clonar el repositorio.
2. Ejecute el siguiente comando en la terminal: `git clone https://github.com/skeletongp/syntax/tree/master`.
3. Una vez que se haya clonado el repositorio, navegue hasta el directorio del proyecto y ejecute el comando `npm install` para instalar todas las dependencias necesarias.
4. Por último, ejecute el comando `ionic capacitor run android -l --external` para iniciar el servidor local y visualizar la aplicación en su navegador web.

¡Listo! Ahora puede utilizar la aplicación en su equipo local y personalizarla según sus necesidades.


## Conclusiones

Syntaxt es una aplicación móvil que ofrece una solución sencilla y efectiva para el registro y organización de tareas básicas. Gracias al uso de tecnologías modernas y una interfaz limpia y atractiva, la aplicación ofrece una experiencia de usuario satisfactoria y una funcionalidad práctica y útil. Con una estructura de tablas relacionales y una serie de funcionalidades principales, la aplicación se presenta como una opción interesante para aquellos usuarios que buscan una herramienta para la gestión básica de sus tareas cotidianas.
