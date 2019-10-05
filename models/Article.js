var mongoose = require('mongoose');
var Schema = mongoose;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  summary: Array
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;