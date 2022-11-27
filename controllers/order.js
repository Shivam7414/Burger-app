import { asyncError } from "../middlewares/errorMiddleware.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/errorHandler.js";
import { instance } from "../server.js";

export const placeOrder = asyncError(
    async (req, res, next) => {
        const {
            shippingInfo, orderItems, paymentMethod, itemPrice, taxPrice, shippingCharages, totalAmount,
        } = req.body;
        const user = "req.user._id";

        const orderOptions = {
            shippingInfo, orderItems, paymentMethod, itemPrice, taxPrice, shippingCharages, totalAmount, user
        };
        await Order.create(orderOptions);
        res.status(201).json({
            success: true,
            message: "Order Placed Successfully via cash on Delivery",
        })
    }
);

export const placeOrderOnline = asyncError(
    async (req, res, next) => {
        const {
            shippingInfo, orderItems, paymentMethod, itemPrice, taxPrice, shippingCharages, totalAmount,
        } = req.body;
        const user = "req.user._id";

        const orderOptions = {
            shippingInfo, orderItems, paymentMethod, itemPrice, taxPrice, shippingCharages, totalAmount, user
        };

        const options = {
            amount: Number(totalAmount) * 100,  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log(order);

        res.status(201).json({
            success: true,
            order,
            orderOptions,
        })
    }
);

export const getMyOrders = asyncError(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id,
    }).populate("user", "name");

    res.status(200).json({
        success: true,
        orders,
    });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name");
    if (!order) {
        return next(new ErrorHandler("Invaild Order Id", 404));
    }
    res.status(201).json({
        success: true,
        order,
    });
});

export const getAdminOrders = asyncError(async (req, res, next) => {
    const orders = await Order.find({
    }).populate("user", "name");

    res.status(200).json({
        success: true,
        orders,
    });
});

export const processOrder = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorHandler("Invaild Order Id", 404));
    if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";


    else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Deliverd";
        order.deliverdAt = new Date(Date.now());
    } else if (order.orderStatus === "Deliverd") {
        return next(new ErrorHandler("Food Already Deliverd", 400));
    }
    await order.save();
    res.status(200).json({
        success: true,
        message: "Status updated successfully",
    });
});

