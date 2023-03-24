
//import super class Request
import Request from "../querys/request.js";
export default class requestTask extends Request {

  //must set db has an instance of Database class using method open
    constructor(db, data) {
      const table="tasks"
       const validations = {
            title: ["required", "string"],
            description: ["required", "string"],
            status: ["required", "string"],
            user_id: ["required", "numeric"],
            due_date: ["required", "string"],
            due_time: ["required", "string"],
            priority: ["required", "numeric"],
        };

        super(db,data, validations, table);
      }


}


