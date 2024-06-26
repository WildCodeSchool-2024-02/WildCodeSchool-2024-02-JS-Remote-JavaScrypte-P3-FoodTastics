const recipes = require("../data/recipes.json");

const AbstractSeeder = require("./AbstractSeeder");

class RecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "recipe", truncate: true });
  }

  run() {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      this.insert({
        ...recipe,
        refName: `recipe${i}`,
      });
    }
  }
}

module.exports = RecipeSeeder;
