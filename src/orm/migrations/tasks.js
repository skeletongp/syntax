
import Migrate from "../initials/migrate.js";
export default class TasksMigration extends Migrate {
  constructor(db) {
    super(db, "tasks");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.text("title");
    this.text("description");
    this.integer("status").default(0);
    this.integer("priority").default(1);
    this.date("due_date");
    this.date("due_time");
    this.date("completed_at").nullable();
    this.text('note').nullable();
    this.foreignKey('user_id', 'users', 'id');
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

