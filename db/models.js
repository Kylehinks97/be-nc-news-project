const db = require("./connection.js");

exports.selectTopics = () => {
  return db
    .query(`
        SELECT * FROM topics;
    `)
    .then((result) => {
      return result;
    });
};
exports.selectArticleById = (id) => {
  return db.query(`
  SELECT * FROM articles WHERE article_id = $1
  `, [id])
    .then((result) => {
      if (result.rows.length === 0 ) {
        return Promise.reject({status: 404,  msg: "Not Found"})
      } else {
        return result.rows[0]
      }
    })
}

exports.selectArticles = () => {
  return db.query(`
  SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)
  AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`)
  .then((result) => {
    return result.rows
  })
}