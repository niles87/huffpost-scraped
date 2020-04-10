$(function () {
  function closeModal() {
    $("#modal").removeClass("is-visible");
    $("#note-modal").removeClass("is-visible");
  }

  // Get articles button
  $(".scrape").on("click", function (event) {
    $.ajax({ url: "/scrape", method: "GET" }).then((data) => console.log("scraped"));
  });

  // Save button
  $(document).on("click", ".save", function (event) {
    const id = $(this).attr("data-id");
    const saved = $(this).data("saved");
    const savedState = { saved: saved };
    console.log(id);
    console.log(savedState);
    console.log(saved);
    $.ajax({ url: "/save_article/" + id, method: "POST", data: savedState }).then((data) => {
      location.reload();
      alert("Saved article");
    });
  });

  // Note button
  $(document).on("click", ".note", function (event) {
    const id = $(this).data("id");
    const modalID = $(this).data("open");
    const title = $(this).data("title");
    $("#" + modalID).addClass("is-visible");
    $("#modal-form").attr("data-id", id).attr("data-title", title);
  });

  $(document).on("click", ".view-note", function (event) {
    const modalID = $(this).data("open");
    const id = $(this).data("id");

    // console.log(note);
    $.ajax({ url: "/notes/" + id, method: "GET" }).then((data) => {
      let noteBody = data[0].body;

      $(".note-body").html(noteBody);

      $("#" + modalID).addClass("is-visible");
    });
  });

  // Submit Note
  $("#submit").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/notes",
      method: "POST",
      data: {
        id: $("#modal-form").data("id"),
        title: $("#modal-form").data("title"),
        body: $("textarea").val(),
      },
    }).then((data) => closeModal());
  });

  // Delete Note
  $(document).on("click", ".delete", function (event) {
    const id = $(this).data("note");
    console.log(id);
    $.ajax({ url: "/note/" + id, method: "DELETE" }).then((data) => location.reload());
  });

  // Close Modal
  $(".close-modal").on("click", closeModal);
});
