export default class QueryBuilder {
  constructor(db, tableName, columns = []) {
    this.tableName = tableName;
    this.columns = columns;
    this.db = db;
  }

  async create(data) {
    const keys = this.columns;
    console.log(keys);
    const values = keys.map((key) => {
      //remove ` from key
      const newKey = key.replace(/`/g, "");
      return data[newKey];
    });

    const placeholders = values.map((value) => "?");
    const sql = `INSERT INTO ${this.tableName} (${keys.join(
      ", "
    )}) VALUES (${placeholders.join(", ")}) `;

    await this.db.run(sql, values);
    const result = await this.db.get(
      `SELECT * FROM ${this.tableName} ORDER BY id DESC LIMIT 1`
    );
    return result[0];
  }

  async save(data) {
    if (data.id) {
      return this.update(data);
    } else {
      return this.create(data);
    }
  }

  async update(data) {
    try {
      const id = data.id;
      delete data.id;
      delete data.created_at;
      delete data.deleted_at;
      data.updated_at = new Date().getTime();
      const columns = Object.keys(data).filter((key) => key != "id");
      
      const entries = Object.entries(data);
      const updates = columns.map((key) => ` ${key} = ?`);
      const values = entries.map(([neil, value]) => value);
      values.push(id);
      const sql = `UPDATE ${this.tableName} SET ${updates.join(
        ", "
      )} WHERE id = ?`;
      const result = await this.db.run(sql, values);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id, softDeletes = false) {
    if (softDeletes == true) {
      const now = Math.floor(new Date().getTime() / 1000);
      const sql = `UPDATE ${this.tableName} SET deleted_at=? WHERE id = ?`;
      await this.db.run(sql, [now, id]);
    } else {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
      await this.db.run(sql, id);
    }
  }

  async forceDelete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    try {
      await this.db.run(sql, id);
      return true;
    } catch (error) {
      return false;
    }
   
  }

  async restore(id) {
    const sql = `UPDATE ${this.tableName} SET deleted_at = NULL WHERE id = ?`;
    await this.db.run(sql, id);
  }

  async updateOrCreate(data) {
    const keys = this.columns;
    const values = keys.map((key) => {
      const newKey = key.replace(/`/g, "");
      return data[newKey];
    });

    const placeholders = values.map((value) => "?");
    const sql = `INSERT OR REPLACE INTO ${this.tableName} (${keys.join(
      ", "
    )}) VALUES (${placeholders.join(", ")}) `;

    const result = await this.db.run(sql, values);
    return result;
  }
}
