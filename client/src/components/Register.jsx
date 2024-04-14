import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ username: '', email: '', password: '' })
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!inputs.username || !inputs.email || !inputs.password) {
                alert('Please fill all details')
                return
            }
            const { data } = await axios.post('http://localhost:5000/api/v1/user/register', inputs)
            if (data.success) {
                alert('User Register ')
                navigate('/login')
            }
        } catch (error) {
            console.log("Error in register page")
            console.log(error)
        }
    }
    return (
        <div>
            <div className='border w-4/6 m-auto '>
                <div className='flex mx-auto  m-5 w-1/4 justify-center'>
                    <h1 className='text-2xl font-mono font-bold text-center w-full'>Register</h1>
                </div>
                <div className='flex mx-auto  m-5 w-1/4'>
                    <input type="text" name="username" id="" placeholder='Enter UserName' className='p-2 border-b-2' value={inputs.username} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-1/4'>
                    <input type="text" name="email" id="email" placeholder='Enter Email' className='p-2 border-b-2' value={inputs.email} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-1/4'>
                    <input type="text" name="password" id="password" placeholder='Enter Password' className='p-2 border-b-2' value={inputs.password} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-1/4'>
                    <button className='bg-black text-white p-2 w-full' onClick={handleSubmit}>Register</button>
                </div>
                <div className='flex mx-auto  m-5 p-2 w-1/4'>
                    <button className=' p-2 w-full ' onClick={() => navigate('/login')}>Already Registerd ? Please Login</button>
                </div>
            </div>
        </div>
    )
}

export default Register
