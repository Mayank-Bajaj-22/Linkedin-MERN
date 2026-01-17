import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 3000;
app.use("/api/auth", authRouter)

app.listen(port, () => {
    connectDB();
    console.log(`Server running on ${port}: http://localhost:${port}/`)
})

// http://localhost:${port}/api/auth/signup