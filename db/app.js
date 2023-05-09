const express = require("express")
const app = express()
const { getTopics } = require("./controllers")

app.use(express.json())

app.get(`/api/topics`, getTopics)







app.all("*", (req, res) => {
    res.status(404).send("404 - Not Found")
})

module.exports = { app };