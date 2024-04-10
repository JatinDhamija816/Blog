import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, { timeStamps: true })

const token = mongoose.model('token', tokenSchema)

export default token