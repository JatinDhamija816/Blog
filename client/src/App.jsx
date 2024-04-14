import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Blog from './components/Blog'
import UserBlogs from './components/UserBlogs'
import CreateBlog from './components/CreateBlog'
import UpdateBlog from './components/UpdateBlog'
import Home from './components/Home'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/createBlog' element={<CreateBlog />} />
        <Route path='/userBlog' element={<UserBlogs />} />
        <Route path='/editBlog/:id' element={<UpdateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
