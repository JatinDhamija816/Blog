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
            const { data } = await axios.post('https://blog-f5ew.onrender.com/api/v1/user/register', inputs)
            if (data.success) {
                alert('User Register ')
                navigate('/login')
            }
        } catch (error) {
            alert("Error while register.")
            console.log(error)
        }
    }
    return (
        <div>
            <div className=' w-3/6 m-auto'>
                <div className='flex mx-auto  m-5 w-1/4 justify-center'>
                    <h1 className='text-3xl font-mono font-bold text-center w-full'>Register</h1>
                </div>
                <div className='flex mx-auto  m-5 w-2/4'>
                    <input type="text" name="username" id="" placeholder='Enter UserName' className='p-2 border-b-2 m-2 w-full ' value={inputs.username} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-2/4'>
                    <input type="text" name="email" id="email" placeholder='Enter Email' className='p-2 border-b-2 m-2 w-full ' value={inputs.email} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-2/4'>
                    <input type="password" name="password" id="password" placeholder='Enter Password' className='p-2 border-b-2 m-2 w-full ' value={inputs.password} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  mt-8 w-2/5'>
                    <button className='bg-black text-white p-2 w-full rounded-2xl' onClick={handleSubmit}>Register</button>
                </div>
                <div className='flex mx-auto  m-5 p-2 w-2/4'>
                    <button className=' p-2 w-full hover:bg-slate-300 rounded-2xl' onClick={() => navigate('/login')}>Already Registerd? Login Here</button>
                </div>
            </div>
        </div>
    )
}

export default Register
