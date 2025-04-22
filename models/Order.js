import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true,

    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                
            }
        }
    ],
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    
}, {timestamps: true});

export const Order = mongoose.model("Order", OrderSchema);
