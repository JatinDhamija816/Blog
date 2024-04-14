import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const [inputs, setInputs] = useState({ title: '', description: '', image: '', user: id })
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post('https://blog-f5ew.onrender.com/create', inputs)
            if (data.success) {
                alert('Blog Created Successfully')
                navigate('/userBlog')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='m-auto w-3/5 mt-20'>
            <div className='mx-auto w-2/3 my-5'>
                <h1 className='text-center font-bold text-3xl font-mono '>Create a Blog</h1>
            </div>
            <div className='mx-auto w-2/3 my-5'>
                <input type="text" placeholder='Enter title' name='title' value={inputs.title} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
            </div>
            <div className='mx-auto  w-2/3 my-5'>
                <input type="text" placeholder='Enter Description' name='description' value={inputs.description} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
            </div>
            <div className='mx-auto  w-2/3 my-5'>
                <input type="text" placeholder='Enter image' name='image' value={inputs.image} onChange={handleChange} className='w-full p-3 border-b-2 rounded-lg' />
                <p className='text-red-400 mx-3'>*Image url</p>
            </div>
            <div className='mx-auto w-2/5'>
                <button className='bg-black text-white w-full my-5 p-2 rounded-2xl' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default CreateBlog
