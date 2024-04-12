import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all details'
            })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'New user Created',
            user
        })
    } catch (error) {
        return res.status(500).send({
            message: "Error in Register",
            success: false,
            error
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            success: true,
            message: "All users Data",
            TotalUser: users.length,
            users,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while get All users",
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please Provide all details'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(201).send({
                success: false,
                message: 'Email is not Register'
            })
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Email or Password'
                })
            }
            return res.status(200).send({
                success: true,
                message: 'Login successfully',
                user
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}