import mongoose from 'mongoose';

export const DB_Connection = async () => {
    // Check if the variable is actually there
    if (!process.env.DB_URL) {
        console.error("ERROR: DB_URL is undefined! Check your .env file path.");
        return;
    }

    try {
        await mongoose.connect("mongodb://rahma:rahma123@ac-us24djg-shard-00-00.jqztkkx.mongodb.net:27017,ac-us24djg-shard-00-01.jqztkkx.mongodb.net:27017,ac-us24djg-shard-00-02.jqztkkx.mongodb.net:27017/sarahaApp_DB?ssl=true&replicaSet=atlas-mt1l2l-shard-0&authSource=admin&appName=Cluster0");
        console.log("Database Connected Successfully!");
    } catch (err) {
        console.log("Failed To Connect:", err.message);
    }
};
