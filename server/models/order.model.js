const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // orderItems: [
        //     {
        //         product: {
        //             type: mongoose.Schema.Types.ObjectId,
        //             ref: "Product",
        //         },
        //         quantity: {
        //             type: Number,
        //             required: true,
        //         },
        //     },
        // ],
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        status: {
            type: String,
            default: "Order placed",
            enum: [
                "Order placed",
                "Out for delivery",
                "Delivered",
                "Cancelled",
            ],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
