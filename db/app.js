const cors = require('cors');
const express = require("express");
const app = express();
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  postComment,
  patchVotes,
  deleteComment
} = require("./controllers");

app.use(cors());
app.use(express.json());


app.get(`/api/topics`, getTopics);
app.get(`/api`, getEndpoints);
app.get(`/api/articles/:article_id`, getArticleById);
app.get(`/api/articles`, getArticles);
app.get(`/api/articles/:article_id/comments`, getCommentsByArticleId)
app.post(`/api/articles/:article_id/comments`, postComment)
app.patch(`/api/articles/:article_id`, patchVotes)
app.delete(`/api/comments/:comment_id`, deleteComment)

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
app.all("/*", (req, res) => {
    res.status(404).send("Not Found");
});

module.exports = { app };
