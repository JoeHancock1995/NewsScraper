var cheerio = require("cheerio");
var axios = require("axios");

// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://www.kxan.com").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("article").each(function(i, element) {

    var title = $(element).children().text();
    var link = $(element).find("a").attr("href");
    var summary = $(element).children().text();
    var img = $(element).find("img").attr("src");
        // Save these results in an object that we'll push into the results array we defined earlier
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
