//import super class Model
import Model from "../querys/model.js";
export default class Task extends Model {
  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db, "tasks", Task.columns, Task.searchables); //
    this.softDeletes = true; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of TaskData
  getter(data) {
    return new TaskData(data);
  }
}

//Class to return data
class TaskData {
  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}

//must set prototype of TaskData to Task prototype
Object.setPrototypeOf(TaskData.prototype, Task.prototype);

//required: set table name, columns and searchables
Task.tableName = "tasks";

//these columns are just examples, you must set your own
Task.columns = [
  "id",
  "title",
  "description",
  "status",
  "priority",
  "note",
  "due_date",
  "due_time",
  "user_id",
  "completed_at",

];
Task.searchables = ["title", "description", "note"];
