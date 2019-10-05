var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
  title: {
    type: Array,
    required: true,
  },
  link: {
    type: Array,
    required: true,
  },
  summary: Array
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;