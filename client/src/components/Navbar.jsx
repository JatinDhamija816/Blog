import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let isLogin = useSelector((state) => state.isLogin)
    isLogin = isLogin || localStorage.getItem('userId')
    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            if (isLogin === false) {
                navigate('/')
            }
            alert('Logout Successfully')
            localStorage.clear()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='min-h-14 bg-black flex justify-between'>
            <div className='flex my-auto mx-10'>
                <Link to='/'><h1 className='text-white text-xl'>Blog App</h1></Link>
            </div>
            {
                isLogin
                &&
                <div className='flex justify-center w-2/3 my-auto'>
                    <div>
                        <Link className='text-white text-xl m-2' to='/blog'>All blogs</Link>
                    </div>
                    <div>
                        <Link className='text-white text-xl m-2' to='/userBlog'>My blogs</Link>
                    </div>
                    <div>
                        <Link className='text-white text-xl m-2' to='/createBlog'>Create Blog</Link>
                    </div>
                </div>
            }
            <div className='flex my-auto mx-10'>
                {
                    !isLogin
                    &&
                    <div>
                        <Link to='/login' className='text-white text-xl m-2'>Login</Link>
                        <Link to='/register' className='text-white text-xl m-2'>Register</Link>
                    </div>
                }
                {
                    isLogin
                    &&
                    <Link className='text-white text-xl m-2' onClick={handleLogout}>Logout</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
