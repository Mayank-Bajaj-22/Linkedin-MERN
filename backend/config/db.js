import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected")
    } catch (error) {
        console.log("db error")
    }
}

export default connectDB;