const express = require("express");
const auth = require("../middleware/auth");
const route = express.Router();
const { getCategoryDeals, searchProduct, updateRating, dealOfDay } = require("../controller/product")

route.get("/productCategory", auth, getCategoryDeals);
route.get("/search/:name", auth, searchProduct);
route.post("/rating", auth, updateRating);
route.get("/deal-of-day", auth, dealOfDay);

module.exports = route;