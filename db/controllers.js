//models
const { selectTopics, selectArticleById } = require("./models.js");
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
exports.getArticleById = (req, res) => {
  const id  = req.params.article_id
  console.log(id);
  selectArticleById(id)
    .then((result) => {
      res.status(200).send({result});
  })
    .catch((err) => {
      if (err) console.log(err);
      res.status(400).send({ msg: "Bad Request" });
    });
};
