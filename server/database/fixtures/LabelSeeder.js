const labels = require("../data/label.json");

const AbstractSeeder = require("./AbstractSeeder");

class LabelSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "label", truncate: true });
  }

  run() {
    for (let i = 0; i < labels.length; i += 1) {
      const label = labels[i];
      const { name, image, description } = label;
      this.insert({
        name,
        image,
        description,
        refName: `label${i}`,
      });
    }
  }
}

module.exports = LabelSeeder;
