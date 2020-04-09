$(function () {
  function closeModal() {
    $("#modal").removeClass("is-visible");
    $("#note-modal").removeClass("is-visible");
  }

  // Get articles button
  $(".scrape").on("click", (event) => {
    $.ajax({ url: "/scrape", method: "GET" }).then((data) => console.log("scraped"));
  });

  // Save button
  $(document).on("click", ".save", (event) => {
    const id = $(this).data("id");
    const saved = $(this).data("saved");
    const savedState = { saved: saved };
    console.log(savedState);
    console.log(saved);
    $.ajax({ url: "/save_article/" + id, method: "POST", data: savedState }).then((data) => {
      location.reload();
      alert("Saved article");
    });
  });

  // Note button
  $(document).on("click", ".note", (event) => {
    const id = $(this).data("id");
    const modalID = $(this).data("open");
    const title = $(this).data("title");
    $("#" + modalID).addClass("is-visible");
    $("#modal-form").attr("data-id", id).attr("data-title", title);
  });

  $(document).on("click", ".view-note", (event) => {
    const modalID = $(this).data("open");
    const id = $(this).data("id");
    const note = $(this).data("note");
    console.log(note);
    $.ajax({ url: "/notes/" + id, method: "GET", data: { id: note } }).then((data) => {
      $("#" + modalID).addClass("is-visible");
    });
  });

  // Submit Note
  $("#submit").on("click", (event) => {
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
  $(document).on("click", ".delete", (event) => {
    const id = $(this).data("id");
    $.ajax({ url: "/articles" + id, method: "DELETE" }).then((data) => location.reload());
  });

  // Close Modal
  $(".close-modal").on("click", closeModal);
});
