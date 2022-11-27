import mongoose from "mongoose";
const schema = new mongoose.Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },
    orderItems: {
        cheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        vegCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        BurgerwithFries: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentMethod: {
        type: "String",
        enum: ["COD", "online"],
        default: "COD",
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },
    paidAt: Date,

    itemPrice: {
        type: Number,
        default: 0,
    },
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingCharages: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Deliverd"],
        default: "Preparing",
    },
    deliverdAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
export const Order = mongoose.model("Order", schema);