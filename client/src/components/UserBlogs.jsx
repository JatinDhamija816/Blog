import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
const UserBlogs = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`http://localhost:5000/api/v1/blog/userBlog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <>
            {
                blogs && blogs.length > 0 ?
                    (blogs.map((blog) => (
                        <div key={blog?._id} className='border min-h-36 w-1/3 m-auto my-5'>
                            <div>
                                <div>
                                    <h1>title: {blog?.title}</h1>
                                </div>
                                <div>
                                    <div>
                                        <button onClick={() => { navigate(`/editBlog/${blog?._id}`) }}><EditIcon /></button>
                                        <button onClick={async () => {
                                            try {
                                                const { data } = await axios.delete(`http://localhost:5000/api/v1/blog/deleteBlog/${blog?._id}`)
                                                if (data?.success) {
                                                    alert('Blog delete ')
                                                    navigate('/')
                                                }
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }}><DeleteIcon /></button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={blog?.image} alt="" />
                            </div>
                            <div>
                                <p>description : {blog?.description}</p>
                            </div>
                            <div>
                                <p>Date : {blog.createdAt}</p>
                            </div>
                        </div>
                    ))) : <h1>You have not created a blog</h1>
            }
        </>
    )
}

export default UserBlogs
