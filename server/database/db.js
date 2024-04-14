import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Mongo DB Error")
        console.log(error)
    }
}
export default Connection