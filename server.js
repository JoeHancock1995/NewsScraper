//=========================================Dependencies=================================//
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = 3000;
var db = require("./models");
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");
// =====Use morgan logger for logging requests/ parsing JSON====//
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ====================Make public a static folder============//
app.use(express.static("public"));

// ==============================Connect to the Mongo DB===============================//
mongoose.connect('mongodb://localhost:27017/newsscraper', {useNewUrlParser: true});
//===================================== Start the Scrape =============================//
app.get("/scrape", function(req, res) {  db.Article.deleteMany({})
.then(function(dbArticleRem) {
  console.log(dbArticleRem);
})
.catch(function(err) {
  console.log(err);
});
//=====================cheerio scraping RA website via axios request================//
axios.get("https://www.residentadvisor.net/reviews.aspx").then(function(response) {
  var $ = cheerio.load(response.data);

  $("article").each(function(i, element) {
    var result = {};
    
    result.title = $(this).find("h1").text();
    result.link = $(this).find("a").attr("href");
    result.summary = $(this).children().last();

    db.Article.create(result)
    .then(function(dbArticle) {
      console.log(dbArticle);
    })
    .catch(function(err) {
      console.log(err);
    });
    res.send("Scrape Complete");
    });
  });
});

//=====================Route for getting all Articles from the db================//
app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//=====================================Route for comments =============================//
app.get("/comments", function(req, res) {
  db.Comment.find({})
    .then(function(dbComments) {
      res.json(dbComments);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//=====================================Route for user =============================//
app.get("/user", function(req, res) {
  db.User.find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//=====================================Route for submit =============================//
app.post("/submit", function(req, res) {

  db.Comment.create(req.body)
    .then(function(dbComments) {
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({}, { $push: { comments: dbComments._id } }, { new: true });
    })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//=====================================Route for populated user comments =============================//
app.get("/populateduser", function(req, res) {
  db.User.find({})
    .populate("comments")
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {

      res.json(err);
    });
});

//===========================Route for saving/updating an Article's associated Note================//
app.post("/articles/:id", function(req, res) {
  Article.create(Article)
    .then(function(dbArticle) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate(
        { _id: req.params.id }, 
        { note: dbArticle._id },
         { new: true }
         );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//=================================Start the server=================================//
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});