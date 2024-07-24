const AbstractRepository = require("./AbstractRepository");

class RecipeLabelRepository extends AbstractRepository {
  constructor() {
    super({ table: "recipe_label" });
  }

  async create(recipeLabel) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (recipe_id, label_id) VALUES (?, ?)`,
      [recipeLabel.recipe_id, recipeLabel.label_id]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT 
        rl.id, 
        r.id AS recipe_id, 
        r.name AS recipe_name, 
        r.image AS recipe_image, 
        r.date AS recipe_date,
        l.id AS label_id,
        l.name AS label_name
      FROM ${this.table} rl
      JOIN recipe r ON rl.recipe_id = r.id
      JOIN label l ON rl.label_id = l.id
      WHERE rl.id = ?
    `,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT 
        rl.id, 
        r.id AS recipe_id, 
        r.name AS recipe_name, 
        r.image AS recipe_image, 
        r.date AS recipe_date,
        l.id AS label_id, 
        l.name AS label_name
      FROM ${this.table} rl
      JOIN recipe r ON rl.recipe_id = r.id
      JOIN label l ON rl.label_id = l.id
    `);

    return rows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result;
  }
}

module.exports = RecipeLabelRepository;
