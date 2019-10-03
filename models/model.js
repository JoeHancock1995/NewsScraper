var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/scraper');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
var ArticlesSchema = new mongoose.Schema({
  title: String,
  link: {type: String, lowercase: true},
  summary: Array
});
module.exports = mongoose.model('Articles', ArticlesSchema);