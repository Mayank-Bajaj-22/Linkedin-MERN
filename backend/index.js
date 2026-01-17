import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    connectDB();
    console.log(`Server running on ${port}: http://localhost:${port}/`)
})