import mongoose from 'mongoose'

const connectDB =  async () => {
    mongoose.connection.on('connected',()=>{
        console.log("connection established")
    })
    
    // PREVIOUS: MongoDB Atlas Connection (commented out due to timeout issues)
    // const mongoUri = "mongodb+srv://username:password@cluster-name.mongodb.net/spotify?retryWrites=true&w=majority"
    
    // CURRENT: Local MongoDB Connection
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spotify"
    await mongoose.connect(mongoUri)
}
export default connectDB;