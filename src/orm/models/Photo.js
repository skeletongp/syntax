//import super class Model
import Model from "../querys/model.js";
export default class Photo extends Model {
  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db, "photos", Photo.columns, Photo.searchables); //
    this.softDeletes = true; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of PhotoData
  getter(data) {
    return new PhotoData(data);
  }
}

//Class to return data
class PhotoData {
  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}

//must set prototype of PhotoData to Photo prototype
Object.setPrototypeOf(PhotoData.prototype, Photo.prototype);

//required: set table name, columns and searchables
Photo.tableName = "photos";

//these columns are just examples, you must set your own
Photo.columns = [
  "id",
  "caption",
  "path",
  "task_id",
 
];
Photo.searchables = [];
