
//import super class Request
import Request from "../querys/request.js";
export default class requestUser extends Request {

  //must set db has an instance of Database class using method open
    constructor(db, data) {
      const table="users"
       const validations = {
            name: ["required", "max:25"],
            email: ["required", "email", "unique:users,email"],
            username: ["required", "max:25", "unique:users,username"],
            password: ["required", "max:40"],

            /* allowed validations: required, unique:table,column, exists:table,column, max, greaterThan, email, url,  string, numeric, array, object, */
        };

        super(db,data, validations, table);
      }


}


