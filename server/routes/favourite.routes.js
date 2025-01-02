const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth.js");
const User = require("../models/user.model.js");

router.put("/add-product-to-favourite", authenticateToken, async (req, res) => {
    try {
        const productId = req.headers["productid"]; // Use exact case or lowercase for header keys
        const userId = req.user.id; // userId should come from the JWT token (req.user.id)

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the user and validate
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the favourites array exists (initialize it if not)
        if (!userData.favourites) {
            userData.favourites = []; // Initialize as an empty array
        }

        // Check if the product is already in favorites
        const isProductFavourite = userData.favourites.includes(productId);
        if (isProductFavourite) {
            return res
                .status(200)
                .json({ message: "Product is already in favorites" });
        }

        // Add the product to favorites
        userData.favourites.push(productId);
        await userData.save();

        return res
            .status(200)
            .json({ message: "Product added to favorites successfully" });
    } catch (error) {
        console.error("Error adding product to favorites:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put(
    "/remove-product-from-favourite",
    authenticateToken,
    async (req, res) => {
        try {
            const productId = req.headers.productid; // Access header with consistent case
            const userId = req.user.id; // userId should come from the JWT token (req.user.id)

            if (!productId) {
                return res
                    .status(400)
                    .json({ message: "Product ID is required" });
            }

            // Find the user and validate
            const userData = await User.findById(userId);
            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the product is in the favorites
            const isProductFavourite = userData.favourites.includes(productId);
            if (!isProductFavourite) {
                return res
                    .status(400)
                    .json({ message: "Product is not in favorites" });
            }

            // Remove the product from favorites
            userData.favourites.pull(productId);
            await userData.save();

            return res.status(200).json({
                message: "Product removed from favorites successfully",
            });
        } catch (error) {
            console.error("Error removing product from favorites:", error); // Update error message
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

router.get(
    "/get-all-favourite-products",
    authenticateToken,
    async (req, res) => {
        try {
            const userId = req.user.id; // Access userId from JWT token

            // Find the user and populate the 'favourites' field with product data
            const userData = await User.findById(userId).populate("favourites");

            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }

            const products = userData.favourites;

            return res.status(200).json({
                message: "Products fetched successfully",
                data: products,
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
);

module.exports = router;
