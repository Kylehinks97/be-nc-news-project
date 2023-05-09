const db = require("./connection.js");

exports.selectTopics = () => {
  console.log("in the model");
  return db
    .query(`
        SELECT * FROM topics;
    `)
    .then((result) => {
      return result;
    });
};
