const express = require("express");
const mongoose = require("mongoose");
var logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/huffscrape";

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const routes = require("./routes/routes");

app.get("/", (req, res) => {
  res.render("index");
});
app.use(routes);

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
