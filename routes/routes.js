const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

router.get("/scrape", (req, res) => {
  axios.get("https://www.huffpost.com/news/").then(function (response) {
    let $ = cheerio.load(response.data);

    $("div.card").each(function (i, element) {
      let news = {};
      news.title = $(element)
        .find(".card__text")
        .find(".card__headlines")
        .find("a")
        .find("h2")
        .text();
      news.link = $(element).find(".card__text").find(".card__headlines").find("a").attr("href");
      news.description = $(element).find(".card__text").find(".card__description").text();

      db.Article.create(news)
        .then((dbArticle) => {
          console.log(dbArticle);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    res.redirect("/articles");
  });
});

// See scraped articles route
router.get("/articles", (req, res) => {
  db.Article.find({}, null, { lean: true }).then((dbArticle) => {
    res.render("articles", { news: dbArticle });
  });
});

// See saved articles route
router.get("/saved_articles", (req, res) => {
  db.Article.find({ isSaved: true }, null, { lean: true }).then((dbSaved) => {
    res.render("articles", { news: dbSaved });
  });
});

// Saving articles route
router.post("/save_article/:id", (req, res) => {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { isSaved: true }).then((data) => {
    res.sendStatus(200);
  });
});

router.post("/notes", (req, res) => {
  console.log("----------------");
  console.log(req.body);
  console.log("----------------");
});

router.get("/notes/:id", (req, res) => {
  db.Article.findById({ _id: req.params.id }, function (err, response) {
    console.log(response.note[0]);
    db.Note.find({ _id: response.note[0] }, null, { lean: true }, function (error, data) {
      res.json(data);
    });
  });
  // res.sendStatus(200);
});

router.delete("/note/:id", (req, res) => {
  db.Note.findOneAndDelete({ _id: req.params.id }, (err, response) => {
    res.sendStatus(200);
  });
});
module.exports = router;
