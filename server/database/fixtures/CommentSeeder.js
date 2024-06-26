const comments = require("../data/comment.json");

const AbstractSeeder = require("./AbstractSeeder");

class CommentSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "comment", truncate: true });
  }

  run() {
    for (let i = 0; i < comments.length; i += 1) {
      const comment = comments[i];
    

      this.insert({
       ...comment,
        refName: `comment${i}`,
    });
}
}
}
module.exports = CommentSeeder; 