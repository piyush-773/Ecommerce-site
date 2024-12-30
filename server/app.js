const express = require("express");
require("dotenv").config()
require("./db/db.js")

const app = express();

app.get("/", (req, res) => {
    res.send("Hello this is world");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});
