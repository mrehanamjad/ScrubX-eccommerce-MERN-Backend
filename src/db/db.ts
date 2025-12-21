import mongoose from "mongoose";
import { config } from "../config/config.js"; // adjust path
import { DB_Name } from "../config/constant.js";

const connectDB = async () => {
    try {
        // Register handlers before connecting
        mongoose.connection.on("connected", () => {
            console.log(`✅ MongoDB connected to ${DB_Name} at host:`, mongoose.connection.host);
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB disconnected!");
        });

        // Connect to the database
        await mongoose.connect(`${config.databaseUrl}/${DB_Name}`);

    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectDB;
