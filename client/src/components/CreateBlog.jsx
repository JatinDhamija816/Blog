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

            const { data } = await axios.post('http://localhost:5000/api/v1/blog/create', inputs)
            if (data.success) {
                alert('Blog Created Successfully')
                navigate('/userBlog')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
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
                <button className='bg-black text-white w-2/3' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default CreateBlog
