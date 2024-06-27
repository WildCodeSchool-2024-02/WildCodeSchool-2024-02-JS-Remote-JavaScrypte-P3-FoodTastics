const AbstractRepository = require("./AbstractRepository");

class MenuRepository extends AbstractRepository {
  constructor() {
   
    super({ table: "menu" });
  }


  async create(menu) {
    
    const [result] = await this.database.query(
      `insert into ${this.table} (date) values (?)`,
      [menu.date]
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

  async update(menu) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET date = ? WHERE id = ?`,
      [menu.date, menu.id]
    );

    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}


module.exports = MenuRepository;
