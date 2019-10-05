var http = require('http');
var cheerio = require('cheerio');

var Scraper = require('./scraper');
var axios = require("axios");
var cheerio = require("cheerio");
//  ========cheerio scraping my website========
// Make axios request 
axios.get("https://www.residentadvisor.net").then(function(response) {
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
  console.log(results);
});
module.exports = Scraper;
// Scraper.prototype.parsePage = function (html) {
//   var $ = cheerio.load(html);
//   var title = $('#title').text();
//   var summary = $('#summary').text();
//   var link = $('#link').text()
//   var model = {
//     title: title.trim().split('\n'),
//     summary: summary.trim()('\n'),
//     link: link.trim().split
//   };
//   return model;
// };


// Scraper.prototype.init = function () {
//   var model;
//   var self = this;
//   self.on('loaded', function (html) {
//       model = self.parsePage(html);
//       self.emit('complete', model);
//   });
//   self.loadWebPage();
// };
// Scraper.prototype.loadWebPage = function () {
//   var self = this;
//   console.log('\n\nLoading ' + 'website');
//   http.get(self.url, function (res) {
//     var body = '';
   
//     if(res.statusCode !== 200) {
//       return self.emit('error', STATUS_CODES[res.statusCode]);
//     }
//     res.on('data', function (chunk) {
//       body += chunk;
//     });
//     res.on('end', function () {
//       self.emit('loaded', body);
//     });
//   })
//   .on('error', function (err) {
//     self.emit('error', err);
//   });      
// };
/*
 * Parse html and return an object
**/
