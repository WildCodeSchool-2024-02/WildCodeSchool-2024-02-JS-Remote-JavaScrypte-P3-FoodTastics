const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (let i = 0; i < 2; i += 1) {
      const fakeUser = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        password: this.faker.internet.password(),
        pseudo: this.faker.person.zodiacSign(),
        image_profile: this.faker.image.avatar(),
        email: this.faker.internet.email(),
        role: "admin",
        refName: `user${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

module.exports = UserSeeder;
