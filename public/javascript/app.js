$(function() {
  $(".scrape").on("click", function(event) {
    $.ajax("/scrape", { type: "POST" }).then(function() {
      console.log("scraped");
    });
  });
});
