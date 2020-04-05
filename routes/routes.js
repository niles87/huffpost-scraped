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
    console.log("below is the saved articles sent to html");
    console.log(dbSaved);
    res.render("articles", { news: dbSaved });
  });
});

// Saving articles route
router.post("/save_article/:id", (req, res) => {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { isSaved: true }).then((data) => {
    res.sendStatus(200);
  });
});

module.exports = router;
