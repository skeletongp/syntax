
//import super class Request
import Request from "../querys/request.js";
export default class requestTagtask extends Request {

  //must set db has an instance of Database class using method open
    constructor(db, data) {
      const table="table"
       const validations = {
            // For example: name: ["required", "lowerThan:25"],
            /* allowed validations: required, unique:table,column, exists:table,column, lowerThan, greaterThan, email, url,  string, numeric, array, object, */
        };

        super(db,data, validations, table);
      }


}


