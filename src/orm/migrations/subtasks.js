
import Migrate from "../initials/migrate.js";
export default class SubtasksMigration extends Migrate {
  constructor(db) {
    super(db, "subtasks");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.text("title");
    this.integer("status").default(0);
    this.date("due_date");
    this.date("completed_at").nullable();
    this.text('note').nullable();
    this.foreignKey('task_id', 'tasks', 'id');
    this.timestamps();
  }
  async up() {
    this.create();
  }
  async down() {
    this.drop();
  }
}

