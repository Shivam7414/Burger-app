import express from "express";
import { isAuthenticated, authorizeAdmin } from "../middlewares/auth.js";
import { getAdminOrders, getMyOrders, getOrderDetails, placeOrder, processOrder, placeOrderOnline } from "../controllers/order.js";

const router = express.Router();

router.post("/createOrder", placeOrder);
router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getOrderDetails);

router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, authorizeAdmin, processOrder);

router.post("/createOrderOnline", placeOrderOnline)

export default router; 