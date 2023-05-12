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
exports.selectCommentsByArticleId = (id) => {
  console.log(id);
  return db.query(`SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments WHERE article_id = $1 ORDER BY comments.created_at;`, [id])
  .then((result) => {
    console.log(result);
    if (result.rows.length === 0 ) {
      return Promise.reject({status: 404,  msg: "Not Found"})
    } else {
      return result.rows
    }
  })
}