const path = require("path");
const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();
const adminData = require("./admin");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// dynamic routes
router.get("/products/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.getOrders);

module.exports = router;
