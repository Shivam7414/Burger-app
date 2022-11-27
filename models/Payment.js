import mongoose from "mongoose";
const schema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        require: true
    },
    razorpay_payment_id: {
        type: String,
        require: true
    },
    razorpay_signature: {
        type: String,
        require: true
    },
    created_At: {
        type: Date,
        default: Date.now,
    }

});

export const Payment = mongoose.modal("Payment", schema);