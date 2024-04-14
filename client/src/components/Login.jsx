import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!inputs.email || !inputs.password) {
                alert('Please fill all details')
                return
            }
            const { data } = await axios.post('http://localhost:5000/api/v1/user/login', inputs)
            if (!data.success) {
                alert('Error in login')
                return
            } else {
                localStorage.setItem('userId', data?.user._id)
                dispatch(authActions.login())
                navigate('/blog')
            }
        } catch (error) {
            console.log("Error in Login page")
            console.log(error)
        }
    }
    return (
        <div>
            <div className='w-3/6 m-auto '>
                <div className='flex mx-auto  m-5 w-2/4 justify-center'>
                    <h1 className='text-2xl font-mono font-bold text-center w-full'>Login</h1>
                </div>
                <div className='flex mx-auto  m-5 w-2/4'>
                    <input type="text" name="email" id="email" placeholder='Enter Email' className=' rounded-lg p-2 border-b-2 m-2 w-full' value={inputs.email} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  m-5 w-2/4'>
                    <input type="password" name="password" id="password" placeholder='Enter Password' className='p-2 border-b-2 m-2 rounded-lg w-full' value={inputs.password} onChange={handleChange} />
                </div>
                <div className='flex mx-auto  mt-8 w-2/5'>
                    <button className='bg-black text-white p-2 w-full rounded-2xl' onClick={handleSubmit}>Login</button>
                </div>
                <div className='flex mx-auto  m-5 p-2 w-2/4'>
                    <button className=' p-2 w-full hover:bg-slate-300 rounded-2xl' onClick={() => navigate('/register')}>New User? Regsiter Here</button>
                </div>
            </div>
        </div >
    )
}

export default Login
