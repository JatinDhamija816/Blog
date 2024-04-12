import express from 'express'
import { getAllUsers, login, RegisterUser } from '../controllers/userControllers.js'

const router = express()

router.get('/allUsers', getAllUsers)
router.post('/register', RegisterUser)

router.post('/login', login)

export default router