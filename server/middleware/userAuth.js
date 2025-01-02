const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is missing
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Invalid or expired token." });
        }

        // Attach the user payload to the request object
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
