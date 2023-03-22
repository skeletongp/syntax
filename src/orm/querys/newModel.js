const fs = require("fs");
const path = require("path");
const modelName = process.argv[2] || "MyModel";
const table = process.argv[3] || "table";

// Validate model name
const regex = /^[A-Z][a-zA-Z]+$/;
if (!modelName || !modelName.match(regex)) {
  console.error("Invalid model name");
  process.exit(1);
}

// Create model file
const modelFile = `${modelName}.js`;
const filePath = `./src/orm/models/${modelFile}`;
if (fs.existsSync(filePath)) {
  console.log(`${modelFile} already exists`);
  process.exit(0);
}

const pathForModel = "../querys/model.js";
const fileContent = `
//import super class Model
import Model from "${pathForModel}";
export default class ${modelName} extends Model {

  //must set db has an instance of Database class using method open
  constructor(db, data = {}) {
    super(db,"${table}", ${modelName}.columns, ${modelName}.searchables); //
    this.softDeletes = false; // set true to enable soft deletes if table has a deleted_at column
  }

  //must set getter method to return an instance of ${modelName}Data
  getter(data) {
    return new ${modelName}Data(data);
  }

}


//Class to return data
class ${modelName}Data {

  //must set constructor to assign data to this
  constructor(data = {}) {
    Object.assign(this, data);
  }
}


//must set prototype of ${modelName}Data to ${modelName} prototype
Object.setPrototypeOf(${modelName}Data.prototype, ${modelName}.prototype);

//required: set table name, columns and searchables
${modelName}.tableName = "${table}";

//these columns are just examples, you must set your own.Dont include id, created_at and updated_at
${modelName}.columns = [ "name", ];
${modelName}.searchables = [];

`;
fs.writeFileSync(filePath, fileContent);

console.log(`${modelFile} created successfully on ${filePath}`);
