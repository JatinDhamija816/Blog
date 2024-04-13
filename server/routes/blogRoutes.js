import express from 'express'
import { createBlog, deleteBlog, getAllBlog, getBlogById, updateBlog, userBlogByID } from '../controllers/blogController.js'

const router = express.Router()

router.post('/create', createBlog)
router.get('/allBlogs', getAllBlog)
router.get('/getBlog/:id', getBlogById)
router.put('/updateBlog/:id', updateBlog)
router.delete('/deleteBlog/:id', deleteBlog)

router.get('/userBlog/:id', userBlogByID)

export default router