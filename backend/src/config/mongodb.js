import mongoose from 'mongoose'

const connectDB =  async () => {
    mongoose.connection.on('connected',()=>{
        console.log("connection established")
    })
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spotify"
    await mongoose.connect(mongoUri)
}
export default connectDB;