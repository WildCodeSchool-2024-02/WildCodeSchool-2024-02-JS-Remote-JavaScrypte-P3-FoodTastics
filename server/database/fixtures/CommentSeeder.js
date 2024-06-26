const AbstractSeeder = require("./AbstractSeeder");

class CommentSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "comment", truncate: true });
  }

  run() {
    for (let i = 0; i < 5; i += 1) {
      const fakeUser = {
        date: new Date(),
        description: this.faker.lorem.paragraph(),
        is_validated: false,
        user_id: 2,
        recipe_id: 1,
        refName: `comment${i}`,
      };

      this.insert(fakeUser);
    }
  }
}
module.exports = CommentSeeder;
