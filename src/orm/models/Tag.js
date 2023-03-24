
//import super class Model
import Model from "../querys/model.js";
export default class Tag extends Model {

  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db,"tags", Tag.columns, Tag.searchables); //
    this.softDeletes = true; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of TagData
  getter(data) {
    return new TagData(data);
  }

}


//Class to return data
class TagData {

  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}


//must set prototype of TagData to Tag prototype
Object.setPrototypeOf(TagData.prototype, Tag.prototype);

//required: set table name, columns and searchables
Tag.tableName = "tags";

//these columns are just examples, you must set your own
Tag.columns = ["id", "name", "created_at", "updated_at"];
Tag.searchables = [];

