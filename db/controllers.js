//models
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  updateComments,
  updateVotes,
  removeComment
} = require("./models.js");
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
      if (Object.keys(result).length === 0) {
        res.status(400).send({ msg: "Invalid Request" });
      }
      res.status(200).send({ article: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getCommentsByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  selectCommentsByArticleId(id)
    .then((result) => {
      // if (result.length === 0) {
      //   res.status(400).send({msg: `Invalid Request`})
      // }
      res.status(200).send({ comments: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.postComment = (req, res, next) => {
  console.log("in last controller");
  const id = req.params.article_id;
  const { author, body } = req.body;
  console.log(req.body, "<-- req.body");
  updateComments(author, body, id)
    .then((result) => {
      if (result.status === 404) {
        return res.status(404).send({ msg: `Not Found` });
      } else if (result.status === 400) {
        return res.status(400).send({ msg: "Invalid Request" });
      }
      return res.status(201).send({ comment: result });
    })
    .catch(next);
};
exports.patchVotes = (req, res, next) => {
  console.log("in the controller");
  const id = req.params.article_id;
  const votes = req.body;
  updateVotes(id, votes)
  .then((result) => {
    console.log(result, "<-- updated Article");
    res.status(200)
    res.send({ article: result })
  })
  .catch(next)
};
exports.deleteComment = (req, res, next) => {
  const comment_id = req.params.comment_id
  console.log(comment_id);
  removeComment(comment_id).then((result) => {
    console.log("back in controller");
    res.sendStatus(204)
  })
}