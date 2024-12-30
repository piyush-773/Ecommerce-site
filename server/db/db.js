const mongoose = require("mongoose");
const conn = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URI}`);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err.message);
    }
};

conn()
