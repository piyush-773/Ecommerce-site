const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth.js");
const User = require("../models/user.model.js");
const Product = require("../models/product.model.js")
const Order = require("../models/order.model.js")

module.exports = router