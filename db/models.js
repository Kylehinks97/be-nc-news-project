const db = require("./connection.js");

exports.selectTopics = () => {
  return db
    .query(
      `
        SELECT * FROM topics;
    `
    )
    .then((result) => {
      return result;
    });
};
exports.selectArticleById = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      } else {
        // console.log(result.rows[0], "<-- result.rows[0]");
        return result.rows[0];
      }
    });
};
exports.selectArticles = () => {
  return db
    .query(
      `
  SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)
  AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};
exports.selectCommentsByArticleId = (id) => {
  return db.query(`
  SELECT * FROM articles WHERE article_id = $1;
  `, [id])
  .then((result) => {
    if (!result.rows.length) {
      return Promise.reject({status: 404, msg: "404 - Not Found"})
    } else {
    return db
      .query(
        `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments WHERE article_id = $1 ORDER BY comments.created_at;`,
        [id]
      )
      .then((result) => {
        console.log(result);
        return result.rows;
      })
    }
  })
};
