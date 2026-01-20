import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, updateProfile } from "../controllers/user.controllers.js";
import multer from "multer";
import upload from "../middlewares/multer.js";

let userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.put("/updateprofile", isAuth, updateProfile);

export default userRouter