const router = require("express").Router();
const User = require("../models/user.model.js");
const Product = require("../models/product.model.js");
const { authenticateToken } = require("../middleware/userAuth.js");

// Add product
router.post("/add-product", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res
                .status(403)
                .json({ message: "You are not authorized to add a product" });
        }

        // Validate product details
        const { url, title, author, price, description, language } = req.body;
        if (!url || !title || !author || !price || !description || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create and save the new product
        const product = new Product({
            url,
            title,
            author,
            price,
            description,
            language,
        });
        const savedProduct = await product.save();

        res.status(200).json({
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//edit product
router.put("/edit-product", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.headers["productid"]; // Use exact case or lowercase for header keys

        // Validate if productId is provided
        if (!productId) {
            return res
                .status(400)
                .json({ message: "Product ID is required in headers" });
        }

        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to update a product",
            });
        }

        // Validate product details
        const { url, title, author, price, description, language } = req.body;
        if (!url || !title || !author || !price || !description || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                url,
                title,
                author,
                price,
                description,
                language,
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// delete product
router.delete("/delete-product", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.headers["productid"]; // Use exact case or lowercase for header keys

        // Validate if productId is provided
        if (!productId) {
            return res
                .status(400)
                .json({ message: "Product ID is required in headers" });
        }

        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to delete a product",
            });
        }

        // Check if the product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/get-all-products", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/get-product/:id", async (req, res) => {
    try {
        const productId = req.params.id; // Access the 'id' parameter
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
