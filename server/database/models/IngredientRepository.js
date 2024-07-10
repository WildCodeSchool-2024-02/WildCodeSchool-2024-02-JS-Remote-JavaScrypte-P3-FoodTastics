const AbstractRepository = require("./AbstractRepository");

class ingredientRepository extends AbstractRepository {
  constructor() {
    super({ table: "ingredient" });
  }

  async create(ingredient) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, category, image, calories, proteins, carbohydrates, sugar, lipids, salt, fiber, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ingredient.name,
        ingredient.category,
        ingredient.image,
        ingredient.calories,
        ingredient.proteins,
        ingredient.carbohydrates,
        ingredient.sugar,
        ingredient.lipids,
        ingredient.salt,
        ingredient.fiber,
        ingredient.user_id,
      ]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(ingredient) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, category = ?, image = ?, calories= ?, proteins = ?, carbohydrates = ?, sugar= ?, lipids = ?, salt= ?, fiber = ?, user_id = ? where id = ?`,
      [
        ingredient.name,
        ingredient.category,
        ingredient.image,
        ingredient.calories,
        ingredient.proteins,
        ingredient.carbohydrates,
        ingredient.sugar,
        ingredient.lipids,
        ingredient.salt,
        ingredient.fiber,
        ingredient.user_id,
        ingredient.id,
      ]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id=?`,
      [id]
    );

    return result;
  }
}

module.exports = ingredientRepository;
