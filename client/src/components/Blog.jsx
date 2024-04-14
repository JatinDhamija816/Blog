import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
const Blog = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const id = localStorage.getItem('userId')
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('https://blog-f5ew.onrender.com/api/v1/blog/allBlogs/')
            if (data?.success) {
                setBlogs(data?.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllBlogs()
    }, [])
    return (
        <div className='flex flex-wrap justify-center'>
            {
                blogs
                &&
                blogs.map((blog) => (
                    <div key={blog?._id} className='bg-slate-200 border max-h-fit w-1/3 mx-10 my-5 rounded-lg'>
                        <div className='flex justify-between m-3'>
                            <div>
                                <h1 className='text-lg font-mono'><span className='font-bold text-lg'>Title</span>: {blog?.title}</h1>
                            </div>
                            <div>
                                {
                                    id === blog?.user._id
                                        ?
                                        <div>
                                            <button onClick={() => { navigate(`/editBlog/${blog?._id}`) }}><EditIcon color='info' /></button>
                                            <button onClick={async () => {
                                                try {
                                                    const { data } = await axios.delete(`https://blog-f5ew.onrender.com/api/v1/blog/deleteBlog/${blog?._id}`)
                                                    if (data?.success) {
                                                        alert('Blog delete ')
                                                        navigate('/userBlog')
                                                    }
                                                } catch (error) {
                                                    console.log(error)
                                                }
                                            }}><DeleteIcon color='error' /></button>
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>
                        <div className='flex justify-center m-8'>
                            <img className='max-h-48 text-center' src={blog?.image} alt="" />
                        </div>
                        <div className='m-3'>
                            <p className='font-serif'><span className='font-bold text-lg'>Description</span> : {blog?.description}</p>
                        </div>
                        <div className='m-3'>
                            <p className='font-serif'><span className='font-bold text-lg'>Written By</span> : {blog?.user?.username}</p>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default Blog
