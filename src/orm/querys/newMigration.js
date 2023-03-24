const fs = require("fs");
const path = require("path");
const table = process.argv[2] || "table";

// Validate model name
const regex = /^[a-z]+$/;
if (!table || !table.match(regex)) {
  console.error("Invalid table name");
  process.exit(1);
}

// Create model file
const modelFile = `${table}.js`;
const filePath = `./src/orm/migrations/${modelFile}`;
if (fs.existsSync(filePath)) {
  console.log(`${modelFile} already exists`);
  process.exit(0);
}
//capitalize first letter of table
const capName = table.charAt(0).toUpperCase() + table.slice(1);
const pathFoMigration = "../initials/migrate.js";
const fileContent = `
import Migrate from "${pathFoMigration}";
export default class ${capName}Migration extends Migrate {
  constructor(db) {
    super(db, "${table}");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here

    this.timestamps();
  }
  async up() {
    this.create();
  }
  async down() {
    this.drop();
  }
}

`;
fs.writeFileSync(filePath, fileContent);

console.log(`${modelFile} created successfully on ${filePath}`);
