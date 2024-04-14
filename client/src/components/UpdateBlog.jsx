import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const UpdateBlog = () => {
    const navigate = useNavigate()
    const [blog, setBlog] = useState({})
    const id = useParams().id
    const [inputs, setInputs] = useState({ title: '', description: '', image: '', user: id })
    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`https://blog-f5ew.onrender.com/api/v1/blog/getBlog/${id}`)
            if (data?.success) {
                setBlog(data?.blog)
                setInputs({
                    title: data?.blog.title, description: data?.blog.description, image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.put(`https://blog-f5ew.onrender.com/api/v1/blog/updateBlog/${id}`, inputs)
            if (data.success) {
                alert('Blog Updated Successfully')
                navigate('/userBlog')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBlogDetails()
    }, [id])
    return (
        <div className='m-auto w-3/5 mt-20'>
            <div className='mx-auto w-2/3 my-5'>
                <h1 className='text-center font-bold text-3xl font-mono '>Update Blog</h1>
            </div>
            <div className='mx-auto w-2/3 my-5'>
                <input type="text" placeholder='Enter title' name='title' value={inputs.title} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
            </div>
            <div className='mx-auto w-2/3 my-5'>
                <input type="text" placeholder='Enter Description' name='description' value={inputs.description} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
            </div>
            <div className='mx-auto w-2/3 my-5'>
                <input type="text" placeholder='Enter image' name='image' value={inputs.image} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
            </div>
            <div className='mx-auto w-2/5'>
                <button className='bg-black text-white w-full my-5 p-2 rounded-2xl' onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )
}

export default UpdateBlog
