
import Migrate from "../initials/migrate.js";
export default class TagsMigration extends Migrate {
  constructor(db) {
    super(db, "tags");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.text("name");
    this.timestamps();
  }
  async up() {
    this.create();
  }
  async down() {
    this.drop();
  }
}

