import bcrypt from 'bcrypt'
import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import token from '../model/token.js'

dotenv.config()
export const signupUser = async (req, res) => {
    try {
        const { name, username, password } = req.body
        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            return res.status(422).json({
                status: 422,
                msg: 'Username already Exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ name, username, password: hashPassword })
        await newUser.save()
        return res.status(200).json({
            status: 200,
            msg: "User Register Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error while Signup User"
        })
    }
}
export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (result) {
                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
                    const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
                    const newToken = new token({ token: refreshToken })
                    await newToken.save()
                    return res.status(201).json({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        name: user.name,
                        username: user.username,
                        status: 201,
                        msg: 'Login successfully'
                    })
                } else {
                    return res.status(422).json({
                        status: 422,
                        msg: 'Invalid Details'
                    })
                }
            })

        } else {
            return res.status(422).json({
                status: 422,
                msg: 'Invalid Details'
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: "Login Error"
        })
    }
}