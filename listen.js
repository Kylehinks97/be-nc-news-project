const { app } = require("./db/app.js");

app.listen(9090, (err) => {
    console.log("in the controller");
    if (err) console.log(err);
    else console.log("listening on 9090");
})