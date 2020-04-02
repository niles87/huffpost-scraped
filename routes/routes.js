const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

router.post("/scrape", (req, res) => {
  axios.get("https://www.huffpost.com/news/").then(function(response) {
    let $ = cheerio.load(response.data);

    $("div.card").each(function(i, element) {
      let results = {};
      results.title = $(element)
        .find(".card__text")
        .find(".card__headlines")
        .find("a")
        .find("h2")
        .text();
      results.link = $(element)
        .find(".card__text")
        .find(".card__headlines")
        .find("a")
        .attr("href");
      results.description = $(element)
        .find(".card__text")
        .find(".card__description")
        .text();

      db.Article.create(results)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          console.log(err);
        });
    });

    res.sendStatus(200);
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
