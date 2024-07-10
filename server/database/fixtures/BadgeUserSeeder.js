const AbstractSeeder = require("./AbstractSeeder");

class BadgeUserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "badge_user", truncate: true });
  }

  run() {
    for (let i = 0; i < 4; i += 1) {
      const fakeUser = {
        badge_id: 1,
        user_id: 2,
        date: new Date(),
      };

      this.insert(fakeUser);
    }
  }
}

module.exports = BadgeUserSeeder;
