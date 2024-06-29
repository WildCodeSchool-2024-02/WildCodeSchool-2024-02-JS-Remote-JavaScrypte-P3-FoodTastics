const AbstractSeeder = require("./AbstractSeeder");

class UserMenuRecipeSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user_menu_recipe", truncate: true });
  }

  run() {
    for (let i = 0; i < 16; i += 1) {
      const fakeUserMenuRecipe = {
        recipe_id: this.faker.number.int({ min: 1, max: 16 }),
        user_id: this.faker.number.int({ min: 1, max: 2 }),
        menu_id: this.faker.number.int({ min: 1, max: 10 }),
      };
      this.insert(fakeUserMenuRecipe);
    }
  }
}

module.exports = UserMenuRecipeSeeder;
