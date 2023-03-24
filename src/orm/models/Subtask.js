//import super class Model
import Model from "../querys/model.js";
export default class Subtask extends Model {
  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db, "subtasks", Subtask.columns, Subtask.searchables); //
    this.softDeletes = true; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of SubtaskData
  getter(data) {
    return new SubtaskData(data);
  }
}

//Class to return data
class SubtaskData {
  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}

//must set prototype of SubtaskData to Subtask prototype
Object.setPrototypeOf(SubtaskData.prototype, Subtask.prototype);

//required: set table name, columns and searchables
Subtask.tableName = "subtasks";

//these columns are just examples, you must set your own
Subtask.columns = [
  "id",
  "title",
  "status",
  "due_date",
  "task_id",
  "completed_at",
  
];
Subtask.searchables = ["title"];
