import mongoose from 'mongoose';

export const DB_Connection = async () => {
    // Check if the variable is actually there
    if (!process.env.DB_URL) {
        console.error("ERROR: DB_URL is undefined! Check your .env file path.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Successfully!");
    } catch (err) {
        console.log("Failed To Connect:", err.message);
    }
};
