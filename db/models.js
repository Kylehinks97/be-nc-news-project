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
      const article = result.rows
      return article[0]
    })
}