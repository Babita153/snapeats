import express from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 place order
router.post("/", authMiddleware, placeOrder);

// 🔥 get user orders
router.get("/my", authMiddleware, getMyOrders);

export default router;