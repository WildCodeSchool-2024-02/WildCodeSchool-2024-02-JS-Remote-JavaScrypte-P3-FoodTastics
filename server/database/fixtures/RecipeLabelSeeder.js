const AbstractSeeder = require("./AbstractSeeder");

class RecipeLabelSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe_label", truncate: true });
  }

  run() {
    for (let i = 0; i < 16; i += 1) {
      const fakeRecipeLabel = {
        label_id: this.faker.number.int({ min: 1, max: 6 }),
        recipe_id: this.faker.number.int({ min: 1, max: 16 }),
      };
      this.insert(fakeRecipeLabel);
    }
  }
}

module.exports = RecipeLabelSeeder;
