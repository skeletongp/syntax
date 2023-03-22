//import super class Model
import Model from "../querys/model.js";
export default class User extends Model {
  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db, "users", User.columns, User.searchables); //
    this.softDeletes = true; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of UserData
  getter(data) {
    return new UserData(data);
  }
}

//Class to return data
class UserData {
  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}

//must set prototype of UserData to User prototype
Object.setPrototypeOf(UserData.prototype, User.prototype);

//required: set table name, columns and searchables
User.tableName = "users";

//these columns are just examples, you must set your own
User.columns = [
  "name",
  "email",
  "username",
  "password",
];
User.searchables = ["name"];
