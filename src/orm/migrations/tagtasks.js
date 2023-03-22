
import Migrate from "../initials/migrate.js";
export default class TagtasksMigration extends Migrate {
  constructor(db) {
    super(db, "tagtasks");
    this.defineTable();
  }
  defineTable() {
    this.id();

    //define others columns here
    this.foreignKey('tag_id', 'tags', 'id');
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

