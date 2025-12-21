import { app } from "./app.js";
import { config } from "./config/config.js";
import connectDB from "./db/db.js";

const PORT = config.port || 8000;


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    });