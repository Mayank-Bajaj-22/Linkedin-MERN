import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        let newPost;
        if (req.file) {
            let image = await uploadOnCloudinary(req.file.path)
            newPost = await Post.create({
                author: req.userId,
                description, 
                image
            })
        } else {
            newPost = await Post.create({
                author: req.userId,
                description
            })
        }

        return res.json(201).json({newPost})
    } catch (error) {
        consolee.log(error)
        return res.json(201).json(`error in create post: ${error}`)
    }
}