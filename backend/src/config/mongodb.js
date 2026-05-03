import mongoose from 'mongoose'

const connectDB =  async () => {
    mongoose.connection.on('connection',()=>{
        console.log("connection established")
    })
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
    await mongoose.connect(`${mongoUri}/spotify`)
}
export default connectDB;