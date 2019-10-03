var cheerio = require("cheerio");
var axios = require("axios");
var handlebars = require("handlebars");
var mongoose = require("mongoose")

var databaseUrl = "newsscraper";
var collections = ["scrapecollection"];
mongoose.connect("mongodb://localhost/newsscraperdb", { useNewUrlParser: true });

//  ========cheerio scraping my website========
// Make a request via axios to grab the HTML body from the site
axios.get("https://www.kxan.com").then(function(response) {
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commandslike jQuery's '$'
  var $ = cheerio.load(response.data);
  // An empty array to save the data that we'll scrape
  var results = [];
  // Select each element in the HTML body from which you want information.
  $("article").each(function(i, element) {
    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");
    var summary = $(element).children().text();
    var img = $(element).find("img").attr("src");
        // Save these results in an object, then into the results array
    results.push({
      title: title,
      link: link,
      summary: summary,
      img: img
    });
  });
  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
