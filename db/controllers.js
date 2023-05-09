const { selectTopics } = require("./models.js")

exports.getTopics = (req, res) => {
    console.log("in controller");
    selectTopics()
    .then((result) => {
        console.log(result.rows);
        res.status(200).send({ topics: result.rows })
    })
    .catch((err) => {
        if (err) console.log(err);
        res.status(500).send({msg: "server error"})
    })
}