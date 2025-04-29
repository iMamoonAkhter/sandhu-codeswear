import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
            },
            img: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            }
        }
    ],
    paymentId: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    onlinePayment: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Order Placed", "Payment Processed", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
        min: [5, "Pincode must be 5 digits"],
        max: [5, "Pincode must be 5 digits"],
    }
}, {timestamps: true});

mongoose.models = {};
export const Order = mongoose.model("Order", OrderSchema);