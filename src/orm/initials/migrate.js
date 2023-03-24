export default class Migrate {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
    this.columns = [];
    this.options = [];
  }

  id(name = "id") {
    this.name(name)
      .type("INTEGER")
      .primary(true)
      .nullable()
      .autoincrement()
      .ok();
    return this;
  }

  name(name) {
    this.currentColumn = { name };
    this.columns.push(this.currentColumn);
    return this;
  }

  type(type) {
    this.currentColumn.type = type;
    return this;
  }
  text(name) {
    this.name(name).type("TEXT");
    return this;
  }

  integer(name) {
    this.name(name).type("INTEGER");
    return this;
  }

  real(name) {
    this.name(name).type("REAL");
    return this;
  }

  date(name) {
    this.name(name).type("DATE");
    return this;
  }

  datetime(name) {
    this.name(name).type("DATETIME");
    return this;
  }

  checkin(name, type = "text", values, def) {
    def = def ? def : values[0];
    this.name(name).type(type).check(values).default(def);
    return this;
  }

  length(length) {
    this.currentColumn.length = length;
    return this;
  }

  primary(primary = true) {
    this.currentColumn.primary = primary;
    return this;
  }

  autoincrement(autoincrement = true) {
    this.currentColumn.autoincrement = autoincrement;
    return this;
  }

  nullable(nullable = true) {
    this.currentColumn.nullable = nullable;
    return this;
  }

  unique(unique = true) {
    this.currentColumn.unique = unique;
    return this;
  }

  check(check) {
    //replace each value with single quotes
    check = check.map((value) => `'${value}'`);

    this.currentColumn.check = `${this.currentColumn.name} IN (${check.join(
      ","
    )})`;
    return this;
  }

  default(defaultValue) {
    this.currentColumn.default = defaultValue;
    return this;
  }

  collate(collate) {
    this.currentColumn.collate = collate;
    return this;
  }

  foreignKey(column, foreignTable, foreignColumn, onUpdate, onDelete) {
    this.name(column).type("INTEGER").ok();
    this.options.push(
      `FOREIGN KEY (${column}) REFERENCES ${foreignTable}(${foreignColumn})`
    );
    if (onUpdate) {
      this.options[this.options.length - 1] += ` ON UPDATE ${onUpdate}`;
    }
    if (onDelete) {
      this.options[this.options.length - 1] += ` ON DELETE ${onDelete}`;
    }
    return this;
  }

  ok() {
    return this;
  }

  timestamps(type = "INTEGER") {
    this.name("created_at").type(type).default("(strftime('%s', 'now'))").ok();
    this.name("updated_at")
      .type("INTEGER")
      .default("(strftime('%s', 'now'))")
      .ok();
    return this;
  }
  softdeletes(type = "INTEGER") {
    this.name("deleted_at").type(type).nullable().ok();
    return this;
  }
  create() {
    const columnDefinitions = this.columns.map((column) => {
      let definition = `${column.name} ${column.type}`;
      if (column.length) {
        definition += `(${column.length})`;
      }
      if (column.primary) {
        definition += " PRIMARY KEY";
      }
      if (column.autoincrement) {
        definition += " AUTOINCREMENT";
      }
      if (column.nullable !== undefined) {
        definition += column.nullable ? " NULL" : " NOT NULL";
      } else {
        definition += " NOT NULL";
      }
      if (column.unique) {
        definition += " UNIQUE";
      }
      if (column.check) {
        definition += ` CHECK(${column.check})`;
      }
      if (column.default !== undefined) {
        definition += ` DEFAULT ${column.default}`;
      }
      if (column.collate) {
        definition += ` COLLATE ${column.collate}`;
      }
      return definition;
    });

    const optionDefinitions = this.options.join(", ");

    const query = `CREATE TABLE IF NOT EXISTS ${
      this.tableName
    } (${columnDefinitions.join(", ")}${
      optionDefinitions ? `, ${optionDefinitions}` : ""
    })`;

    return new Promise((resolve, reject) => {
      this.db
        .run(query, [])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  //drop table if exists
  drop() {
    return this.db.run(`DROP TABLE IF EXISTS ${this.tableName}`);
  }

  //truncate table if exists
  truncate() {
    this.db.run(`DELETE FROM ${this.tableName} WHERE ID > 0`);
  }

  add(columnName) {
    this.currentColumn = { name: columnName };
    this.columns.push(this.currentColumn);
    return this;
  }

  getColumnDefinition(column) {
    let definition = `${column.name} ${column.type}`;

    if (column.primary) {
      definition += " PRIMARY KEY";
    }
    if (column.autoincrement) {
      definition += " AUTOINCREMENT";
    }

    if (column.nullable) {
      definition += " NOT NULL";
    }

    if (column.unique) {
      definition += " UNIQUE";
    }

    return definition;
  }

  async createColumn() {
    const columnDefinition = this.getColumnDefinition(this.currentColumn);
    const existsColumn = await this.validateColumn(this.currentColumn.name);
    if (existsColumn) return false;
    const query = `ALTER TABLE ${this.tableName} ADD COLUMN ${columnDefinition}`;
    this.runQuery(query);
  }

  async validateColumn(column) {
    const query = `PRAGMA table_info(${this.tableName})`;

    return new Promise((resolve, reject) => {
      this.db
        .get(query)
        .then((result) => {
          const columnNames = result ? result.map((column) => column.name) : [];
          resolve(columnNames.includes(column));
        })
        .catch((err) => {
          reject(false);
        });
    });
  }

  async rename(oldColumnName, newColumnName) {
    const existsColumn = await this.validateColumn(oldColumnName);
    if (!existsColumn) return false;
    const query = `ALTER TABLE ${this.tableName} RENAME COLUMN ${oldColumnName} TO ${newColumnName}`;
    return this.runQuery(query);
  }

  async dropColumn(columnName) {
    const existsColumn = await this.validateColumn(columnName);
    if (!existsColumn) return false;
    const query = `ALTER TABLE ${this.tableName} DROP COLUMN  ${columnName}`;
    await this.runQuery(query);
    this.columns = this.columns.filter((column) => column.name !== columnName);
  }
  async runQuery(query) {
    return new Promise((resolve, reject) => {
      this.db
        .run(query, [])
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
