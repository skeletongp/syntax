const fs = require("fs");
const path = require("path");
const modelName = process.argv[2] || "MyModel";
const tableName = process.argv[3] || "table";

// Validate model name
const regex = /^[A-Z][a-zA-Z]+$/;
if (!modelName || !modelName.match(regex)) {
  console.error("Invalid model name");
  process.exit(1);
}

// Create model file
const requestFile = `request${modelName}.js`;
const filePath = `./src/orm/requests/${requestFile}`;
if (fs.existsSync(filePath)) {
  console.error(`${requestFile} already exists`);
  process.exit(1);
}

var pathForRequest = "../querys/request.js";
const fileContent = `
//import super class Request
import Request from "${pathForRequest}";
export default class request${modelName} extends Request {

  //must set db has an instance of Database class using method open
    constructor(db, data) {
      const table="${tableName}"
       const validations = {
            // For example: name: ["required", "lowerThan:25"],
            /* allowed validations: required, unique:table,column, exists:table,column, lowerThan, greaterThan, email, url,  string, numeric, array, object, */
        };

        super(db,data, validations, table);
      }


}


`;
fs.writeFileSync(filePath, fileContent);

console.log(`${requestFile} request created successfully`);
