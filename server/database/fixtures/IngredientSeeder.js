/* eslint-disable camelcase */

const ingredients = require("../data/ingredients.json");

const AbstractSeeder = require("./AbstractSeeder");

class IngredientSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "ingredient", truncate: true });
  }

  run() {
    for (let i = 0; i < ingredients.length; i += 1) {
      const ingredient = ingredients[i];
      const {
        name,
        category,
        image,
        calories,
        proteins,
        carbohydrates,
        sugar,
        lipids,
        salt,
        fiber,
        user_id
      } = ingredient;
      this.insert({
        name,
        category,
        image,
        calories,
        proteins,
        carbohydrates,
        sugar,
        lipids,
        salt,
        fiber,
        user_id,
        refName: `ingredient_${i}`,
      });
    }
  }
}

module.exports = IngredientSeeder;
