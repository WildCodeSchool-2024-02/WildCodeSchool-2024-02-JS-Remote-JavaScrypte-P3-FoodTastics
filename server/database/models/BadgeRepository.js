const AbstractRepository = require("./AbstractRepository");

class BadgeRepository extends AbstractRepository {
  constructor() {
    super({ table: "badge" });
  }

  async create(badge) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, image) VALUES (?,?,?)`,
      [badge.name, badge.description, badge.image]
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async update(badge) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET
      name = ?,
      description = ?,
      image = ?
      WHERE id = ?`,
      [badge.name, badge.description, badge.image, badge.id]
    );
    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = BadgeRepository;
