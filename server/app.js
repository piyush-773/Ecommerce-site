const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(bodyParser.json());
require("dotenv").config()
require("./db/db.js")

// Configure CORS
app.use(cors({
    origin: process.env.ORIGIN, // Set allowed origin from .env
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true // Enable credentials if needed
}));

const user = require("./routes/user.routes.js")
const product = require("./routes/product.routes.js")
const favourite = require("./routes/favourite.routes.js")
const cart = require("./routes/cart.routes.js")
const order = require("./routes/order.routes.js")

app.use("/api/v1", user)
app.use("/api/v1", product)
app.use("/api/v1", favourite)
app.use("/api/v1", cart)
app.use("/api/v1", order)

app.get("/", (req, res) => {
    res.send("Hello this is world");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});
