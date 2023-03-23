import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import Task from "@/orm/models/Task";
import Photo from "@/orm/models/Photo";
import testData from "@/assets/testData.js";
const noPhoto = require("@/assets/no-photo.png");
const dbName = "taskDB";
const dbPath = "default";

const  initDB= async () => {
    try {
       
           await CapacitorSQLite.createConnection({ database: dbName, path: dbPath });
        
    } catch (error) {
        const exists=error.toString().includes('already exists');
        if(!exists){
            console.log(error);
        }
        return ;
    }
}
const mmigrateDB= async () => {
  const migrations = [
    "users",
    "tasks",
    "subtasks",
    "photos",
    "tags",
    "tagtasks",
    
  ]; 
  migrations.forEach((migration) => {
    import(`../orm/migrations/${migration}.js`).then(async (module) => {
      const Migration = new module.default(db, migration);
      await Migration.up();
    });
  });
}
const populateTasks= async () => {
  const tasks = await new Task(db).get();
 if (tasks.length == 0) {
    try {
      testData.map(async (task) => {Task(db).create(task);
      });
      for (let index = 0; index <= 52; index++) {
        await new Photo(window.db).create({
          task_id: index,
          path: noPhoto,
          caption: new Date().getTime().toString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
initDB();
mmigrateDB();

const db = {
  run: async (sql, values = []) => {
    try {
        await CapacitorSQLite.open({ database: dbName, path: dbPath });
      const result = await CapacitorSQLite.query({
        database: dbName,
        statement: sql,
        values: values,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  get: async (sql, values = []) => {
    try {
    console.log(sql, values)

        await CapacitorSQLite.open({ database: dbName, path: dbPath });
      const result = await CapacitorSQLite.query({
        database: dbName,
        statement: sql,
        values: values,
      });
      return result.values;
    } catch (error) {
      console.log(error);
    }
  },
};
String.prototype.hash = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

window.db = db;
populateTasks();

