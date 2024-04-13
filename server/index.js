import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Connection from './Database/db.js'
import userRoute from './routes/userRoutes.js'
import blogRoute from './routes/blogRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)

const Port = process.env.PORT || 8000
app.listen(Port, (req, res) => {
    console.log("Server Start")
})

Connection()