// ----------things to put in app.js
// 1. function to loop through articles.
$(function () {
  $('#scrapebtn').on('click', function () {
     var text = $('#fromInput');
     $.ajax({
       url:"serv.php",
       method: "GET",
       data: {
         "title": text,
         "link": Attr,
         "summary": text
       },
       success: function(data) {
         var name=JSON.parse(data);
         $(".autofiller").val(name.name);// Try this 
       }
     });
   });
 });


 // Function to call the scrape articles route
function scrapeArticles() {
  $.get('/scrape', function(data) {
    console.log('Data', data);

    // After scrape is finished, get the articles
    console.log('Call getArticles');
    getArticles();
    // Set the number of new articles to display
    var displayArticles = data.length;

    // Set the alert text
    alert("Added ${displayArticles} new articles");
  });
}

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
