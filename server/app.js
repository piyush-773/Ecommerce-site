const express = require("express");
const app = express();
app.use(express.json())
require("dotenv").config()
require("./db/db.js")
const user = require("./routes/user.routes.js")

app.use("/api/v1", user)

app.get("/", (req, res) => {
    res.send("Hello this is world");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});
