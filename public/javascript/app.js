$(function () {
  // Get articles button
  $(".scrape").on("click", function (event) {
    $.ajax("/scrape", { type: "GET" }).then(function () {
      console.log("scraped");
      setTimeout(function () {
        location.reload();
      }, 2000);
    });
  });

  // Save button
  $(document).on("click", ".save", function (event) {
    const id = $(this).data("id");
    const saved = $(this).data("saved");
    const savedState = { saved: saved };
    console.log(savedState);
    console.log(saved);
    $.ajax("/save_article/" + id, { type: "POST", data: savedState }).then(function () {
      alert("Saved article");
    });
  });
});
