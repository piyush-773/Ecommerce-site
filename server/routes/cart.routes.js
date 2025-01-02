const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth.js");
const User = require("../models/user.model.js");

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const productId = req.headers["productid"]; // Use exact case or lowercase for header keys
        const userId = req.user.id; // Securely get userId from JWT token

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the user by ID
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the product is already in the cart
        const isProductInCart = userData.cart.includes(productId);
        if (isProductInCart) {
            return res
                .status(200)
                .json({ message: "Product is already in cart." });
        }

        // Add the product to the cart
        userData.cart.push(productId);
        await userData.save();

        return res
            .status(200)
            .json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        return res
            .status(500)
            .json({ message: "An internal server error occurred" });
    }
});

router.put(
    "/remove-from-cart/:productId",
    authenticateToken,
    async (req, res) => {
        try {
            const { productId } = req.params; // Extract productId from params
            const userId = req.user.id; // Extract userId from JWT token

            if (!productId) {
                return res
                    .status(400)
                    .json({ message: "Product ID is required" });
            }

            // Find the user by ID
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the product is in the cart
            const isProductInCart = user.cart.includes(productId);
            if (!isProductInCart) {
                return res
                    .status(404)
                    .json({ message: "Product not found in cart" });
            }

            // Remove the product from the cart
            user.cart.pull(productId);
            await user.save();

            return res
                .status(200)
                .json({ message: "Product removed from cart successfully" });
        } catch (error) {
            console.error("Error in removing from cart:", error);
            return res
                .status(500)
                .json({ message: "An internal server error occurred" });
        }
    }
);

router.get("/get-all-cart-products", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Access userId from JWT token

        // Find the user and populate the 'cart' field with product data
        const userData = await User.findById(userId).populate("cart");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Reverse the order of products in the cart
        const products = userData.cart.reverse();

        return res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
