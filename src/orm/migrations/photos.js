
import Migrate from "../initials/migrate.js";
export default class PhotosMigration extends Migrate {
  constructor(db) {
    super(db, "photos");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.text("caption");
    this.text("path");
    this.foreignKey('task_id', 'tasks', 'id');

    this.timestamps();
    this.softdeletes();
  }
  async up() {
    this.create();
  }
  async down() {
    this.drop();
  }
}

