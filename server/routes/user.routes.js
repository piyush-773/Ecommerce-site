const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        // Validate username length
        if (!username || username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Validate password length
        if (!password || password.length <= 5) {
            return res
                .status(400)
                .json({ message: "Password length should be greater than 5" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
        });

        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: "Sign up successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username length
        if (!username || username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username length should be greater than 3" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Successful sign-in
        const authClaim = [
            { name: existingUser.username },
            { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaim }, process.env.SECRET_KEY, {
            expiresIn: "30d",
        });
        return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token, message: "Sign in successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
