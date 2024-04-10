import express from 'express'
import { signupUser, loginUser } from '../controllers/user.js'
const router = express()

router.post('/signup', signupUser)
router.post('/login', loginUser)

export default router