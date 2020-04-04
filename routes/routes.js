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
    res.send("scrape complete");
  });
});

router.get("/articles", (req, res) => {
  db.Article.find({}, null, { lean: true }).then((dbArticle) => {
    console.log("================");
    console.log(dbArticle);
    res.render("articles", {
      news: dbArticle,
    });
  });
});

router.get("/", (req, res) => {
  res.render("articles");
});
module.exports = router;
