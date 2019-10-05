var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = 3000;
var db = require("./models");
var app = express();

//scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
var axios = require("axios");
var cheerio = require("cheerio");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB


mongoose.connect('mongodb://localhost:27017/newsscraper', {useNewUrlParser: true});
 
//===================================== Getting the Scrape =============================//
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.residentadvisor.net/reviews.aspx").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // Now, we grab every li within an article tag, and do the following:
    $("title").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
      .children('a')
      .text();
      
      result.link = $(this)
      .children("a")
      .attr("href");

      result.summary = $(this)
      .children("p")
      .text();

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});




//===================================== comments =============================//
app.get("/comments", function(req, res) {
  // Find all Notes
  db.Comment.find({})
    .then(function(dbComments) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbComments);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

//===================================== user =============================//
app.get("/user", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

//===================================== submit =============================//
app.post("/submit", function(req, res) {
  // Create a new Note in the db
  db.Comment.create(req.body)
    .then(function(dbComments) {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { comments: dbComments._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

//===================================== populateduser comments =============================//
app.get("/populateduser", function(req, res) {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("comments")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});





// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  Article.create(Article)
    .then(function(dbArticle) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate(
        { _id: req.params.id }, 
        { note: dbNote._id },
         { new: true }
         );
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




///// --------- working cheerio example
var http = require('http');
var cheerio = require('cheerio');


var axios = require("axios");
var cheerio = require("cheerio");
//  ========cheerio scraping my website========
// Make axios request 
axios.get("https://www.residentadvisor.net/reviews.aspx").then(function(response) {
// Load into cheerio and save it to a variable  // '$' acts like jQuery's '$'
  var $ = cheerio.load(response.data);
  var results = [];
// each element in the HTML we want information
  $("article").each(function(i, element) {
    var title = $(element).find("h1").text();
    var link = $(element).find("a").attr("href");
    var summary = $(element).children("p").text();
 
// Save these results in an object. Then the results array
    results.push({
      title: title,
      link: link,
      summary: summary
    });
  });
  console.log(results);
});



// ------ use for user routing and comments

// Route for retrieving all Notes from the db
app.get("/comments", function(req, res) {
  // Find all Notes
  db.Comment.find({})
    .then(function(dbComments) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbComments);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/user", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for saving a new Note to the db and associating it with a User
app.post("/submit", function(req, res) {
  // Create a new Note in the db
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to get all User's and populate them with their notes
app.get("/populateduser", function(req, res) {
  // Find all users
  db.User.find({})
    // Specify that we want to populate the retrieved users with any associated notes
    .populate("comments")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});
