const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
} = require("./controllers");

app.use(express.json());

app.get(`/api/topics`, getTopics);
app.get(`/api`, getEndpoints);
app.get(`/api/articles/:article_id`, getArticleById);
app.get(`/api/articles`, getArticles);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Request" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server error" });
});
app.all("*", (req, res) => {
    res.status(404).send("404 - Not Found");
});

module.exports = { app };
