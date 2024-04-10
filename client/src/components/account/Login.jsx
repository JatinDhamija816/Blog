import React, { useState } from 'react'

const Login = () => {
    const [account, setAccount] = useState('login')

    const toogleSignup = () => {
        account === 'signup' ? setAccount('login') : setAccount('signup')
    }

    return (
        <div className='border w-2/5 mt-20 m-auto flex-row p-5'>
            {
                account === 'login' ?
                    <>
                        <div className='flex justify-center m-5'>
                            <h1 className='font-bold text-4xl text-blue-400 m-3'>Login</h1>
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Username' className='m-auto my-2 border-b-2 w-2/3 p-1' />
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Password' className='m-auto my-2 border-b-2 w-2/3 p-1' />
                        </div>
                        <div className='flex m-5'>
                            <button className='m-auto my-2 border bg-blue-500 text-white w-2/3 py-1'>Login</button>
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
                            <h1 className='font-bold text-4xl text-blue-400 m-3'>SignUp</h1>
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Name' className='m-auto my-2 border-b-2 w-2/3 p-1' />
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Username' className='m-auto my-2 border-b-2 w-2/3 p-1' />
                        </div>
                        <div className='flex m-5'>
                            <input type="text" placeholder='Enter Password' className='m-auto my-2 border-b-2 w-2/3 p-1' />
                        </div>
                        <div className='flex m-5'>
                            <button className='m-auto my-2 border bg-blue-500 text-white w-2/3 py-1'>SignUp</button>
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

export default Login