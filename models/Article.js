var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    // `name` must be of type String
    // `name` must be unique, the default mongoose error message is thrown if a duplicate value is given
      title: String,
      summary: String,
      url: String
    });
    // `books` is an array that stores ObjectIds
    // The ref property links these ObjectIds to the Book model
    // This allows us to populate the Library with any associated Articles

  var Article = mongoose.model("Article", ArticleSchema);

// Export the Library model
module.exports = Article;
