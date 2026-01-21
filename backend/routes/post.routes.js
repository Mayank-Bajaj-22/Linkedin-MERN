import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createPost, getPost } from "../controllers/post.controllers.js";

let postRouter = express.Router();

postRouter.post("/createpost", isAuth, upload.single("image"), createPost)
postRouter.get("/getpost", isAuth, getPost)

export default postRouter;