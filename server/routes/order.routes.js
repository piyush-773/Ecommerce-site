const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth.js");
const User = require("../models/user.model.js");
const Order = require("../models/order.model.js");

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Access user ID from JWT token
        const { order } = req.body; // Expect an array of product IDs in the request body

        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({
                message: "Order data is required and should be an array",
            });
        }

        const orderIds = [];
        for (const orderData of order) {
            // Create and save a new order for each product
            const newOrder = new Order({
                user: userId,
                orderItems: orderData._id,
            });
            const savedOrder = await newOrder.save();

            // Store the order ID for later use
            orderIds.push(savedOrder._id);
        }

        // Update user orders and remove items from the cart
        await User.findByIdAndUpdate(userId, {
            $push: { orders: { $each: orderIds } },
            $pull: { cart: { $in: order.map((o) => o._id) } },
        });

        return res.status(200).json({
            message: "Orders placed successfully",
            orderIds,
        });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// for user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user and populate orders along with order items
        const userData = await User.findById(userId).populate({
            path: "orders",
            populate: {
                path: "orderItems",
                model: "Product", // Ensure this matches your Product model name
            },
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const orders = userData.orders ? userData.orders.reverse() : [];

        return res.status(200).json({
            message: "Order history fetched successfully",
            totalOrders: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// for admin only
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Ensure the user is an admin
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Access denied. Admins only." });
        }

        // Fetch all orders with populated orderItems and user details
        const orders = await Order.find()
            .populate({
                path: "orderItems",
                model: "Product", // Ensure this matches your Product model name
            })
            .populate({
                path: "user",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Order history fetched successfully",
            totalOrders: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.put("/update-order-status/:id", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const { status } = req.body;

        // Validate status field
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        // Ensure the user is an admin
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Access denied. Admins only." });
        }

        // Update the order status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
