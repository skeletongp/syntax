import Migrate from "../initials/migrate.js";
export default class UsersMigration extends Migrate {
  constructor(db) {
    super(db, "users");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.text("name").ok();
    this.text("email").unique(true).ok();
    this.text("username").ok();
    this.text("password").ok();
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
