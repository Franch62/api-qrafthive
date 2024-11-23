const express = require("express");

const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/authMiddleware");

class orderRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/", orderController.getOrders);
    this.router.get("/:id", orderController.getOrderById);
    this.router.post("/", orderController.createOrder);
    this.router.put("/:id", verifyToken, orderController.updateOrder);
    this.router.delete("/:id", verifyToken, orderController.deleteOrder);
  }
}

module.exports = new orderRoutes().router;
