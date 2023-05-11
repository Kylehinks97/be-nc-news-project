//models
const { selectTopics, selectArticleById, selectArticles } = require("./models.js");
const fs = require("fs");

exports.getTopics = (req, res) => {
  selectTopics()
    .then((result) => {
      res.status(200).send({ topics: result.rows });
    })
    .catch((err) => {
      if (err) console.log(err);
      res.status(500).send({ msg: "server error" });
    });
};
exports.getEndpoints = (req, res) => {
  return fs.readFile("endpoints.json", `utf-8`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Couldn't read endpoints.json");
    } else {
      const parsedEndpoints = JSON.parse(data);
      res.send({ endpoints: parsedEndpoints });
    }
  });
};
exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  selectArticleById(id)
    .then((result) => {
      res.status(200).send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  selectArticles()
  .then((articles) => {
    res.status(200).send({ articles: articles })
  })
  .catch((err) => {
    console.log("in catch");
    next(err)
  })
}
