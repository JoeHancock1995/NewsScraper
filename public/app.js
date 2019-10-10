 // Function to call the scrape articles route
 function scrapeArticles() {
       $(document).on('click', '#scrapebtn', function(e) {
      console.log('scrapebtn clicked');
      e.preventDefault();
      $('#articles').empty();
      getArticles();
      console.log('Call getArticles');
    });
  $.get('/articles', function(data) {
    console.log('Data', data);
    // After scrape is finished, get the articles
      });
    }

function getArticles(){
  $.get('/articles', function(dbArticle) {
    $('#articles').empty();
    for (var i=0; i < dbArticle.length; i++) {
      var card = $('<div>');
      card.addClass('card');
      var cardHeader = $('<div>');
      cardHeader.addClass('card-header');
      var cardBody = $('<div>');
      cardBody.addClass('card-body');
      var p =$('<p>');
      p.addClass('byLine');
      p.html(dbArticle[i].byLine);
      cardBody.append(cardHeader,p);
      card.append(cardBody);
      $('#articles').append(card);
    }
  });
};

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
