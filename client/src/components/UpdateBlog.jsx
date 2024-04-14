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
            const { data } = await axios.get(`http://localhost:5000/api/v1/blog/getBlog/${id}`)
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

            const { data } = await axios.put(`http://localhost:5000/api/v1/blog/updateBlog/${id}`, inputs)
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
        <div>
            <div className='border  m-auto w-1/3 '>
                <div className='mx-auto w-2/3'>
                    <input type="text" placeholder='Enter title' name='title' value={inputs.title} onChange={handleChange} className='w-2/3 p-3 border-b-2' />
                </div>
                <div className='mx-auto  w-2/3'>
                    <input type="text" placeholder='Enter Description' name='description' value={inputs.description} onChange={handleChange} className='w-2/3 p-3 border-b-2' />
                </div>
                <div className='mx-auto  w-2/3'>
                    <input type="text" placeholder='Enter image' name='image' value={inputs.image} onChange={handleChange} className='w-2/3 p-3 border-b-2' />
                </div>
                <div className='mx-auto w-2/3'>
                    <button className='bg-black text-white w-2/3' onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog
