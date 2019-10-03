var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/scraper');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// the data i will collect from the scraper
var ArticlesSchema = new mongoose.Schema({
    title: String,
    summary: String,
    url: String
});

module.exports = mongoose.model('Articles', ArticlesSchema);