const badges = require("../data/badges.json");

const AbstractSeeder = require("./AbstractSeeder");

class BadgeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "badge", truncate: true });
  }

  run() {
    for (let i = 0; i < badges.length; i += 1) {
      const ingredient = badges[i];
      const {
        name,
        description,
        image
      } = ingredient;
      this.insert({
        name,
        description,
        image
      });
    }
  }
}

module.exports = BadgeSeeder;
