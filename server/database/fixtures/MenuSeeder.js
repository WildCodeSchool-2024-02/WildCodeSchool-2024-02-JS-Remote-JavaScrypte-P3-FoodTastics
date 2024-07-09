const AbstractSeeder = require("./AbstractSeeder");

class MenuSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "menu", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeUser = {
        date: new Date(),
        refName: `menu${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

module.exports = MenuSeeder;
