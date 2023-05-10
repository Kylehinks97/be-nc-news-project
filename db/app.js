const express = require("express")
const app = express()
const { getTopics, getEndpoints } = require("./controllers")

app.use(express.json())

app.get(`/api/topics`, getTopics)
app.get(`/api`, getEndpoints)






app.all("*", (req, res) => {
    res.status(404).send("404 - Not Found")
})

module.exports = { app };