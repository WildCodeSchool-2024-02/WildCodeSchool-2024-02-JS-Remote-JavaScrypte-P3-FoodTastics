const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
   
    super({ table: "user" });
  }


  async create(user) {
    
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, password, pseudo, image_profile, email, role) values (?, ?, ?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.password, user.pseudo, user.image_profile, user.email, user.role]
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

  async update(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, password = ?, pseudo = ?, image_profile = ?, email = ?, role = ? WHERE id = ?`,
      [user.firstname, user.lastname, user.password, user.pseudo, user.image_profile, user.email, user.role, user.id]
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


module.exports = UserRepository;
