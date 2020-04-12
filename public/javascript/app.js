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

    $(".body").html("");

    // console.log(note);
    $.ajax({ url: "/notes/" + id, method: "GET" }).then((data) => {
      let title;
      let body;
      let id;
      data.forEach((element) => {
        title = element.title;
        body = element.body;
        id = element._id;
        let newTitle = `<h3 class="note-title">${title}</h3>`;
        let newBody = `<p class="note-body">${body}</p>`;
        let newId = `<button class="delete" data-note="${id}"><i class="fas fa-times"></i></button>`;
        $(".body").append(newTitle).append(newBody).append(newId);
      });

      if (data.length === 0) {
        return;
      } else {
        $("#" + modalID).addClass("is-visible");
      }
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
    }).then((data) => {
      closeModal();
      location.reload();
    });
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
