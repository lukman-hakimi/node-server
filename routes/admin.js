const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/admin");
const { createProducts,getAllProducts,deleteProduct } = require("../controller/admin");

router.post("/addProducts", adminMiddleware, createProducts);
router.get("/getProducts", adminMiddleware, getAllProducts);
router.delete("/:productId", adminMiddleware, deleteProduct);

module.exports = router;