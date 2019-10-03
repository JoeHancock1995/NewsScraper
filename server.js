var express = require("express");
var handlebars = require("handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var PORT = 3000;
var Article = require("./models/Article");
var Scraper = require("./models/Scraper");
var app = express();
var db = require("./models");

var axios = require("axios");
var cheerio = require("cheerio");

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
 
// Save these results in an object. Then the results array
    results.push({
      title: title,
      link: link,
      summary: summary
    });
  });
});


mongoose.connect("mongodb://localhost/newsscraper", { useNewUrlParser: true });
// Create an object containing dummy data to save to the database
var data = {
    array: ["item1", "item2", "item3"],
    boolean: false,
    string:
    "\"Don't worry if it doesn't work right. If everything did, you'd be out of a job\" - Mosher's Law of Software Engineering",
  number: 42
};

Scraper.create(data)
.then(function(dbscraper) {
    console.log(dbScraper);
})
.catch(function(err) {
    console.log(err.message);
});
Article.create(data)
  .then(function(dbArticle) {
    // If saved successfully, print the new Library document to the console
    console.log(dbArticle);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });


//Routes

app.post("/submit", function(req, res) {
    // Create a new Book in the database
    db.Article.create(req.body)
      .then(function(dbArticle) {
        // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
        // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Scraper.findOneAndUpdate({}, { $push: { article: dbArticle._id } }, { new: true });
      })
      .then(function(dbScraper) {
        // If the Library was updated successfully, send it back to the client
        res.json(dbScraper);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
  // Route for getting all books from the db
  app.get("/Article", function(req, res) {
    // Using our Book model, "find" every book in our db
    db.Article.find({})
      .then(function(dbArticle) {
        // If any Books are found, send them to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
  // Route for getting all libraries from the db
  app.get("/Scraper", function(req, res) {
    // Using our Library model, "find" every library in our db
    db.Scraper.find({})
      .then(function(dbScraper) {
        // If any Libraries are found, send them to the client
        res.json(dbScraper);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
  // Route to see what library looks like WITH populating
  app.get("/populated", function(req, res) {
    // Using our Library model, "find" every library in our db and populate them with any associated books
    db.Scraper.find({})
      // Specify that we want to populate the retrieved libraries with any associated books
      .populate("articles")
      .then(function(dbScraper) {
        // If any Libraries are found, send them to the client with any associated Books
        res.json(dbScraper);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
  
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  