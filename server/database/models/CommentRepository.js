const AbstractRepository = require("./AbstractRepository");

class CommentRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "comment" });
  }

  // The C of CRUD - Create operation

  async create(comment) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (date, description, is_validated, user_id,recipe_id) values (?, ?, ?, ?, ? )`,
      [
        comment.date,
        comment.description,
        comment.is_validated,
        comment.user_id,
        comment.recipe_id,
      ]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation

  async update(comment) {
    const [result] = await this.database.query(
      `update ${this.table} set date = ?, description = ?, is_validated = ?, user_id = ?, recipe_id = ? 
        WHERE id = ?`,
      [
        comment.date,
        comment.description,
        comment.is_validated,
        comment.user_id,
        comment.recipe_id,
        comment.id,
      ]
    );
    return result;
  }

  // The D of CRUD - Delete operation

  async delete(commentId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [commentId]
    );
    return result;
  }
}

module.exports = CommentRepository;
