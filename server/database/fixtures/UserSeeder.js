/* eslint-disable camelcase */
const users = require("../data/users.json");

const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];
      const {
        firstname,
        lastname, 
        password,
        pseudo, 
        image_profile, 
        email, 
        is_admin, 
        comment_quantity
    } = user;

      this.insert({
        firstname,
        lastname,
        password,
        pseudo,
        image_profile,
        email,
        is_admin,
        comment_quantity,
        refName: `user_${i}`,
    });
}
}
}

module.exports = UserSeeder;