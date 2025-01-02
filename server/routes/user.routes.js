const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { authenticateToken } = require("../middleware/userAuth.js");

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (!username || username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!password || password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password length should be greater than 5" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
        });

        await newUser.save();
        return res.status(201).json({ message: "Sign up successful!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const tokenPayload = {
            id: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });

        return res.status(200).json({
            id: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
            token,
            message: "Sign in successful",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get user info
router.get("/user-info", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;

        // Validate address
        if (!address || typeof address !== "string") {
            return res.status(400).json({ message: "Invalid address" });
        }

        // Update the address
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { address },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Address updated successfully",
            updatedAddress: updatedUser.address,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
