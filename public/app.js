// ----------things to put in app.js
 // Function to call the scrape articles route
function scrapeArticles() {
  $.get('/scrape', function(data) {
    console.log('Data', data);
    alert("Added new articles");
    // After scrape is finished, get the articles
    console.log('Call getArticles');
      })
    };

$("#btnScrape").click (function() {
  $.get('/articles', function(data) {
    alert("data:" + data);
  });
});
// Click the Scrape New Articles Button
$(document).on('click', '#btnScrape', function(e) {
  console.log('btnScrape Clicked!');
  // Prevent submit
  e.preventDefault();
  // Empty the Articles div
  $('#articles').empty();
  // Now call the function to scrape and get the Articles
  scrapeArticles();
});
// 2. build a div card for each one after looping each article
// 3. make buttons work- fetch articles, add/ delete comments, etc
// 4. append card and info
// 5. similar fashion as articles but have a loop go over comments
// 6. create a way for these comments to be edited, create any buttons and add to car
//    (maybe reference the mysql todolist for syntax?)
// 7. make a request to take in changes made by user. WIll require some form of validation.
// 8. append the card to articles div
// 9. call my scraper function route from server.js and console log
// 10. make Scraper buttons in nav methods for onclick events. Make sure it doesnt delete anything on screen.
// 11. if anything is edited pages should reload itself upon return to reflect comments and update scrae
