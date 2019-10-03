var mongoose = require("mongoose");
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
// initialize scraping 
Scraper.prototype.init = function () {
  var model;
  var self = this;
  self.on('loaded', function (html) {
      model = self.parsePage(html);
      self.emit('complete', model);
  });
  self.loadWebPage();
};

//parses html and gets required data
Scraper.prototype.parsePage = function (html) {
  var $ = cheerio.load(html);
  var title = $('#title').text();
  var link = $('#link').text();
  var summary = $('#summary').text();

  var model = {
    title: title.trim(),
    link: link.trim(),
    summary: summary.trim().split('\n')
  };
  return model;
};

module.exports = Scraper;