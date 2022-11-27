import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay"

connectDB();

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.get("/", (req, res, next) => {
    res.send("Server is working fine");

})
app.listen(process.env.PORT, () => {
    console.log(`Server is working :${process.env.PORT}`);
})