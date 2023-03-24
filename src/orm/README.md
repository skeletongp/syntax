# Paquete ORM

La carpeta orm contiene funcionales básicas para manejar base de datos SQlite en proyectos de javascript.

## Descripción

Este paquete te permitirá trabajar tus operaciones con SQLite de manera sencilla, gracias a clases y métodos con los que podrás, crear, modificar, añadir y eliminar elementos en tu base de datos.

Además, podrás trabajar con todas las operaciones de DDl (Insersar, Actualizar, Leer y Eliminar), con lo que podrás manipular fácilmente los datos que almacenes y crear funcionalidades a partir de los mismos.

Este fichero cuenta con una estructura básica bastante funcional, ya que permite trabajar con Modelos, Requests y Migraciones, con el objetivo de facilitar de manera significativa cada una de las tareas que deses ejecutar en tu proyecto usando SQLite.

## Instalación

Para utilizar este paquete, sigue los siguientes pasos:

- **Copia el fichero "orm"** en la carpeta raíz desde donde se ejecuta tu proyecto. Por ejemplo, src.

- **Añade los scripts correspondientes** a tu package.json para poder generar archivos desde la línea de comandos:

```json
// pacakge.json

"scripts": {
    ...,
    "new:model": "node src/orm/querys/newModel.js",
    "new:request": "node src/orm/querys/NewRequest.js",
    "new:migration": "node src/orm/querys/newMigration.js"
}
```

Con esto podrás generar modelos, request y migraciones respectivamente. Más adelante, en cada sección te explicaremos cómo funciona.

- **Genera una instancia de tu base de datos.**

Crea un archivo de arranque para tu proyecto en el que inicialices una instancia de sqlite3 referenciando tu base de datos. Por ejemplo:

```javascript
//importa sqlite3
const sqlite3 = require("sqlite3");

//obtén la ruta actual donde se ejecuta el proyecto
const userPath = os.homedir();

//Crea un path donde vas a guardar tu base de datos
const systemPath = path.join(userPath, "AppData", "Local", "Programs");

//Crea una carpeta para tu proyecto en esa ruta
fs.mkdir(path.join(systemPath, "MyProject"), { recursive: true }, (error) => {});

//crea una instancia de la base de datos con los métodos get y run
const database = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
});
const db = {
    run =async (query, value)=>{
         try {
    return new Promise((resolve, reject) => {
      const stmt = database.prepare(query, (err) => {
        if (err) {
          reject(err.message);
        }
      });
      stmt.run(value, (err) => {
        if (err) {
          reject(err.message);
        }
        resolve("ok");
      });
    });
  } catch (error) {
    console.log(error);
  }
    },

    get= (sql, values)=>{
        return new Promise((resolve, reject) => {
    database.all(sql, values, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
    }
}
 // Exporta ese objeto db, ya que es el que usarás en todas las operaciones de paquete
```
