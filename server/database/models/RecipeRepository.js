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
      `SELECT 
        r.id, 
        r.name AS recipe_name, 
        r.number_of_people AS recipe_number_of_people,
        r.description AS recipe_description, 
        r.image AS recipe_image, 
        r.date AS recipe_date, 
        r.is_favorite, 
        r.vote, 
        r.set_up_time, 
        r.is_validated, 
        r.user_id, 
        r.badge_id,
        u.firstname AS user_firstname,
        u.lastname AS user_lastname
      FROM recipe r
      JOIN user u ON r.user_id = u.id
      WHERE r.id = ?`,
      [id]
    );

    return rows[0];
  }

  async readIngredients(recipeId) {
    const [rows] = await this.database.query(
      `SELECT 
        r.id AS recipe_id,
        i.id AS ingredient_id,
        i.name AS ingredient_name,
        i.image AS ingredient_image,
        ri.recipe_id AS recipe_id,
        ri.ingredient_id AS ingredient_id
      FROM recipe r
      JOIN recipe_ingredient ri ON ri.recipe_id = r.id
      JOIN ingredient i ON ri.ingredient_id= i.id
      WHERE r.id = ?`,
      [recipeId]
    );

    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, name, number_of_people, description, image, date, is_favorite, vote, set_up_time, is_validated, user_id, badge_id from ${this.table}`
    );

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
