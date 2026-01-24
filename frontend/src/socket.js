import { io } from "socket.io-client";

const socket = io("https://linkedin-backend-i3di.onrender.com", {
    withCredentials: true,
    transports: ["websocket", "polling"]
});

export default socket;
