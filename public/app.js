// route
/*
Calvin notes: I removed the document.onclick since you defined a function called scrapeArticles. You can only do 1 of the following to scrape
 1) create a document on click event listner - which I removed
 2) create a custom function and call this function when user clicks on button (which you did and thats what were doing here)
*/
function scrapeArticles() {
      console.log('scrapebtn clicked');
      $('#articles').empty();

      // Calvin note...I updated this to route to point to your scrape logic. You had /articles endpoint.
      $.get('/scrape', function(data) {
        console.log('Data', data);
        // After scrape is finished, get the articles
        getArticles();
      });
      
      console.log('Call getArticles');
}

function getArticles(){
  $.get('/articles', function(dbArticle) {
    $('.articles').empty();
    for (var i=0; i < dbArticle.length; i++) {
      var card = $('<div>');
      card.addClass('card');
      var cardHeader = $('<div>').text(dbArticle[i].title[0]);
      cardHeader.addClass('card-header');
      var cardBody = $('<div>').text(dbArticle[i].summary[0]);
      cardBody.addClass('card-body');
      var p =$('<p>').text(dbArticle[i].link[0]);
      p.addClass('byLine');
      p.html(dbArticle[i].byLine);
      // var btnComments=$('<div>');
      // btnComments.addClass('commentbtn');
      // btnComments.text("Comment");
      cardBody.append(cardHeader,p);
      card.append(cardBody);
      $('.articles').append(card);
    }
  });
};

$(function() {
  var $commentBtn = $('#commentBtn');
  var $commentForm = $('#commentForm');
  var $textInput =  $('input:text');

  $commentBtn.show();
  $commentForm.hide();

  $('#showForm').on('click', function() {
    $commentBtn.hide();
    $commentForm.show();
  });
  $commentForm.on('submit', function(e) {
    e.preventDefault();
    var newText = $('input:text').val();
    $('li:last').after('<li>' + newText + '</li>');
    $commentForm.hide();
    $commentBtn.show();
    $textInput.val('');
  });
});


// function commenting() {
//   console.log('comment button click');
//   $('.comment-button').addEventListener.on('click', '.comment-button', function(){
//     $("#comments").empty();
//     var thisId = $(this).attr("data-id"); 
//     $.ajax({
//       method: "get",
//       url: "/comments" + thisId,
//       data: {
//         title: $("#titleinput").val(),
//         body: $("#bodyinput").val()
//       }
//     })
//     .then(function(data) {
//       console.log(data);
//       $("#comments").empty();

//       $("#comments").append("<h2>" + data.title + "</h2>");
//       $("#comments").append("<input id='titleinput' name ='title'>");
//       $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
//       $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       if (data.comment) {
//         $("#titleinput").val(data.comment.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.comment.body); 
//       }
//     })
//   })
// };
// // Whenever someone clicks a p tag
// $(document).on("click", "card", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

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
