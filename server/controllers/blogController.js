import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
export const createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        if (!title || !description || !image || !user) {
            return res.status(401).send({
                message: "Please fill all deatils"
            })
        }
        const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Enable to find User"
            })
        }
        const newblog = new blogModel({ title, description, image, user })

        const session = await mongoose.startSession()
        session.startTransaction()
        await newblog.save({ session })
        existingUser.blogs.push(newblog)
        await existingUser.save({ session })
        await session.commitTransaction()

        await newblog.save()
        return res.status(201).send({
            success: true,
            message: 'New Blog Created',
            newblog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in createBlog',
            error
        })
    }
}

export const getAllBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find({})
        return res.status(200).send({
            success: true,
            message: "All Blogs",
            TotalBlogs: blogs.length,
            blogs,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in getAllBlog',
            error
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not find with this id"
            })
        }
        return res.status(201).send({
            success: true,
            message: "Fetch single Blog",
            blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in getBlogById'
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in updateBlog',
            error
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(201).send({
            success: true,
            message: "Blog Deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in deleteBlog'
        })
    }
}

export const userBlogByID = async (req, res) => {
    try {
        const { id } = req.params
        const userBlog = await userModel.findById(id).populate('blogs')
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blog not find with this id"
            })
        }
        return res.status(201).send({
            success: true,
            message: "All User Blog",
            userBlog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in userBlogByID'
        })
    }
}