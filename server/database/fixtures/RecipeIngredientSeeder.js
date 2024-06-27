const AbstractSeeder = require("./AbstractSeeder");

class RecipeIngredientSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe_ingredient", truncate: true });
  }

  run() {
    for (let i = 0; i < 15; i += 1) {
      const fakeRecipeIngredient = {
        recipe_id: this.faker.number.int({ max: 16 }),
        ingredient_id: this.faker.number.int({ max: 100 }),
        quantity: this.faker.number.int({ min: 100, max: 1000 }),
      };

      this.insert(fakeRecipeIngredient);
    }
  }
}

module.exports = RecipeIngredientSeeder;
