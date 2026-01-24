import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import connectionRouter from "./routes/connection.routes.js";
import http from "http"
import { Server } from "socket.io";
import notificationRouter from "./routes/notification.routes.js";

dotenv.config();

const app = express();
let server = http.createServer(app);

app.use(cors({
    origin: "https://linkedin-frontend-5h6g.onrender.com",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

export const io = new Server(server, {
    cors: ({
        origin: "https://linkedin-frontend-5h6g.onrender.com",
        credentials: true,
        methods: ["GET", "POST"]
    })
})

const port = process.env.PORT || 3000;
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/connection", connectionRouter)
app.use("/api/notification", notificationRouter)

export const userSocketMap = new Map()

io.on("connection", (socket) => {
    console.log("user connected", socket.id)

    socket.on("register", (userId) => {
        userSocketMap.set(userId, socket.id)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})
// soket matlab user 

server.listen(port, () => {
    connectDB();
    console.log(`Server running on ${port}: http://localhost:${port}/`)
})

// http://localhost:${port}/api/auth/signup