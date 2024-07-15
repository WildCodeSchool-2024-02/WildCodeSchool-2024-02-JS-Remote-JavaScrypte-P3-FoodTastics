const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, password, pseudo, image_profile, email, role) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.password,
        user.pseudo,
        user.image_profile,
        user.email,
        user.role,
      ]
    );

    return result.insertId;
  }

  async readBadges(id) {
    const [rows] = await this.database.query(
      `SELECT
        u.id AS user_id,
        u.firstname,
        u.lastname,
        u.pseudo,
        u.image_profile,
        u.email,
        u.role,
        b.id AS badge_id,
        b.name AS badge_name,
        b.description AS badge_description,
        b.image AS badge_image,
        bu.date AS badge_date      
      FROM
        user u
      LEFT JOIN
        badge_user bu ON u.id = bu.user_id
      LEFT JOIN
        badge b ON bu.badge_id = b.id      
      WHERE
        u.id =?`,
      [id]
    );

    return rows;
  }

  async readMenus(id) {
    const [rows] = await this.database.query(
      `SELECT
         m.id AS menu_id,
         m.date AS menu_date,
         r.name AS recipe_name,
         r.image AS recipe_image
       FROM
         user u
       JOIN
         user_menu_recipe umr ON u.id = umr.user_id
       JOIN
         menu m ON umr.menu_id = m.id
       JOIN
         recipe r ON umr.recipe_id = r.id
       WHERE
         u.id = ?`,
      [id]
    );

    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, password = ?, pseudo = ?, image_profile = ?, email = ?, role = ? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.password,
        user.pseudo,
        user.image_profile,
        user.email,
        user.role,
        user.id,
      ]
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

  async findUserByEmail(email) {
    const [result] = await this.database.query(
      `SELECT  email, firstname, password FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return result;
  }
}

module.exports = UserRepository;
