import mongoose from "mongoose";
import "dotenv/config";

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

// MongoDB Atlas usa mongodb+srv:// en lugar de mongodb://
const connectionString = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`;

console.log(`Connecting to database at: ${DATABASE_URL}`);
console.log(`Full connection string (hidden password): mongodb+srv://${DATABASE_USER}:****@${DATABASE_URL}/${DATABASE_NAME}`);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`✅ Successfully connected to MongoDB Atlas: ${DATABASE_NAME}`);
})
.catch((err) => {
    console.error("❌ MongoDB connection error:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("\nPossible causes:");
    console.error("1. Check your credentials (user/password)");
    console.error("2. Check if your IP is whitelisted in MongoDB Atlas");
    console.error("3. Check if the database cluster is active");
    console.error("\nFull error:", err);
});

const db = mongoose.connection;
db.on("error", (err) => {
    console.error("Database connection error:", err);
});
db.once("open", function () {
    console.log(`You are now connected to: ${DATABASE_NAME}`);
});
