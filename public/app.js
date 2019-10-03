
$("#fetch").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/news",
      dataType: "json",
      data: {
        title: $("#title").val(),
        link: $("#link").val(),
        summary: $("#summary").val(),
        created: Date.now()
      }
    })
    .then(function(results) {
        console.log(results);
        getUnread();
        $("#title").val("");
        $("#link").val("");
        $("#summary").val("");
      }
      );
      return false;
    });
// Click event to add a comment to the db
$("#add").on("click", function() {
    $.ajax({
      type: "POST",
      url: "/comments",
      dataType: "json",
      data: {
        name: $("#name").val(),
        comment: $("#comment").val(),
        created: Date.now()
      }
    })
      .then(function(data) {
        console.log(data);
        getUnread();
        $("#name").val("");
        $("#comment").val("");
      }
      );
    return false;
  });
  
  // Functions
  
  // Load unread books and render them to the screen
  function getNews() {
    $("News").empty();
    $.getJSON("/news", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#title").prepend("<tr><td>" + data[i].title + "</td></tr>");
        $("#link").prepend("<tr><td>" + data[i].link + "</td></tr>"); 
        $("#summary").prepend ("<td><tr>" + data[i].summary + "</td></tr>");
      }
      $("#news").prepend("<tr><th>Title</th><th>Link</th><th>Summary</th></tr>");
    });
  }
  
  var theDiv = document.getElementById("title");
  var content = document.createTextNode("results");
  theDiv.appendChild(results);
  
  // Calling our function
  getNews();
  