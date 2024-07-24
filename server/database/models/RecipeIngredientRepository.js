const AbstractRepository = require("./AbstractRepository");

class RecipeIngredientRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe_ingredient" });
  }

  async create(recipeIngredient) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, ingredient_id) VALUES (?, ?)`,
      [recipeIngredient.recipe_id, recipeIngredient.ingredient_id]
    );

    return result.insertId;
  }

  async read(id) {
    const [recipeIngredient] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return recipeIngredient[0];
  }

  async readAll() {
    const [recipeIngredients] = await this.database.query(
      `SELECT * FROM ${this.table}`
    );

    return recipeIngredients;
  }

  async update(recipeIngredient) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET recipe_id = ?, ingredient_id WHERE id = ?`,
      [
        recipeIngredient.recipe_id,
        recipeIngredient.ingredient_id,
        recipeIngredient.id,
      ]
    );

    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = RecipeIngredientRepository;
