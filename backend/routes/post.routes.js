import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { comment, createPost, deleteComment, getPost, like } from "../controllers/post.controllers.js";

let postRouter = express.Router();

postRouter.post("/createpost", isAuth, upload.single("image"), createPost)
postRouter.get("/getpost", isAuth, getPost)
postRouter.get("/like/:id", isAuth, like)
postRouter.post("/comment/:id", isAuth, comment)
postRouter.delete("/comment/:postId/:commentId", isAuth, deleteComment)

// :id called params

export default postRouter;