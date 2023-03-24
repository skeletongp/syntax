
//import super class Model
import Model from "../querys/model.js";
export default class Tagtask extends Model {

  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db,"tagtasks", Tagtask.columns, Tagtask.searchables); //
    this.softDeletes = false; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of TagtaskData
  getter(data) {
    return new TagtaskData(data);
  }

}


//Class to return data
class TagtaskData {

  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}


//must set prototype of TagtaskData to Tagtask prototype
Object.setPrototypeOf(TagtaskData.prototype, Tagtask.prototype);

//required: set table name, columns and searchables
Tagtask.tableName = "tagtasks";

//these columns are just examples, you must set your own
Tagtask.columns = ["id", "tag_id", "task_id"];
Tagtask.searchables = [];

