const AbstractRepository = require("./AbstractRepository");

class RecipeRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe" });
  }

  async create(recipe) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, number_of_people, description, image, date, is_favorite, vote, set_up_time, is_validated, user_id, badge_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.name,
        recipe.number_of_people,
        recipe.description,
        recipe.image,
        recipe.date,
        recipe.is_favorite,
        recipe.vote,
        recipe.set_up_time,
        recipe.is_validated,
        recipe.user_id,
        recipe.badge_id,
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

  async update(recipe) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, number_of_people = ?, description = ?, image = ?, date = ?, is_favorite = ?, vote = ?, set_up_time = ?, is_validated = ?, user_id = ?, badge_id = ? where id = ?`,
      [
        recipe.name,
        recipe.number_of_people,
        recipe.description,
        recipe.image,
        recipe.date,
        recipe.is_favorite,
        recipe.vote,
        recipe.set_up_time,
        recipe.is_validated,
        recipe.user_id,
        recipe.badge_id,
        recipe.id,
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

module.exports = RecipeRepository;
