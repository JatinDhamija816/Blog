import React, { useState } from 'react'
import axios from 'axios'
const LoginSignup = () => {
    const [account, setAccount] = useState('login')
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    let signupInitial = { name: '', username: '', password: '' }
    const [signup, setSignup] = useState(signupInitial)
    let loginInitial = { username: '', password: '' }
    const [login, setLogin] = useState(loginInitial)
    const toogleSignup = () => {
        account === 'signup' ? setAccount('login') : setAccount('signup')
    }
    const onInuputSignChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const onInuputLoginChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }
    const signupUser = async (e) => {
        e.preventDefault()
        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill all the details')
            return
        }
        if (signup.password.length < 6) {
            setError('Password Length must be greater than 6')
            return
        }
        await axios.post('http://localhost:5000/signup', signup)
            .then(function (res) {
                if (res.status === 200) {
                    setSuccess('User Register Successfully')
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        setError('Username already Exists')
                    }
                } else if (error.response.status === 500) {
                    setError('Registeration failed')
                }
            })
        setError('')
        setSuccess('')
    }
    const loginUser = async (e) => {
        e.preventDefault()
        if (!login.username || !login.password) {
            setError('Please fill all the details')
            return
        }
        await axios.post('http://localhost:5000/login', login)
            .then(function (res) {
                if (res.data.status === 201) {
                    sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`)
                    sessionStorage.setItem('refereshToken', `Bearer ${res.data.refreshToken}`)
                    setSuccess('Login Successfully')
                }
            })
            .catch(function (error) {
                if (error.response.status === 422) {
                    setError('Invalid details')
                }
            })
    }
    return (
        <div className='border w-2/5 mt-20 m-auto flex-row p-5'>
            {
                account === 'login' ?
                    <>
                        <div className='flex justify-center m-5'>
                            <div className='flex-row'>
                                <h1 className='font-bold text-4xl text-center text-blue-400 m-3'>Login</h1>
                                {
                                    success ?
                                        success && <p className='text-center text-green-500'>{success}</p>
                                        :
                                        error && <p className='text-center text-red-500'>{error}</p>

                                }
                            </div>
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Username' className='m-auto my-2 border-b-2 w-2/3 p-1' name='username' onChange={onInuputLoginChange} />
                        </div>
                        <div className='flex m-5'>
                            <input type="password" placeholder='Enter Password' className='m-auto my-2 border-b-2 w-2/3 p-1' name='password' onChange={onInuputLoginChange} />
                        </div>
                        <div className='flex m-5'>
                            <button className='m-auto my-2 border bg-blue-500 text-white w-2/3 py-1' onClick={loginUser}>Login</button>
                        </div>
                        <div className='flex m-2 justify-center'>
                            <h1 className=''>OR</h1>
                        </div>
                        <div className='flex m-2'>
                            <button className='m-auto font-bold my-2 w-2/3 py-1' onClick={toogleSignup}>Create an Account</button>
                        </div>
                    </>
                    :
                    <>
                        <div className='flex justify-center m-5'>
                            <div >
                                <h1 className='text-center font-bold text-4xl text-blue-400 m-3'>SignUp</h1>
                                {
                                    success ?
                                        success && <p className='text-center text-green-500'>{success}</p>
                                        :
                                        error && <p className='text-center text-red-500'>{error}</p>

                                }
                            </div>
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Name' className='m-auto my-2 border-b-2 w-2/3 p-1' name='name' onChange={onInuputSignChange} />
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Username' className='m-auto my-2 border-b-2 w-2/3 p-1' name='username' onChange={onInuputSignChange} />
                        </div>
                        <div className='flex m-5'>
                            <input type="password" placeholder='Enter Password' className='m-auto my-2 border-b-2 w-2/3 p-1' name='password' onChange={onInuputSignChange} />
                        </div>
                        <div className='flex m-5'>
                            <button className='m-auto my-2 border bg-blue-500 text-white w-2/3 py-1' onClick={signupUser}>SignUp</button>
                        </div>
                        <div className='flex m-2 justify-center'>
                            <h1 className=''>OR</h1>
                        </div>
                        <div className='flex m-2'>
                            <button className='m-auto font-bold my-2 w-2/3 py-1' onClick={toogleSignup}> Already Have an Account</button>
                        </div>
                    </>
            }
        </div >
    )
}

export default LoginSignup