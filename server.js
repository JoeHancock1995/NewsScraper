var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var handlebars = require("handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var PORT = 3000;

// Initialize Express
var app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true });

db.Article.create({ name: "Test Article" })
  .then(function(dbArticle) {
    // If saved successfully, print the new Library document to the console
    console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });

//  ========cheerio scraping my website========
// Make axios request 
axios.get("https://www.kxan.com").then(function(response) {
// Load into cheerio and save it to a variable  // '$' acts like jQuery's '$'
  var $ = cheerio.load(response.data);
  var results = [];
// each element in the HTML we want information
  $("article").each(function(i, element) {
    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");
    var summary = $(element).children().text();
    var img = $(element).find("img").attr("src");
// Save these results in an object. Then the results array
    results.push({
      title: title,
      link: link,
      summary: summary
    });
  });

  console.log(results);
});
