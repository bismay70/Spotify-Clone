import mongoose from 'mongoose'

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("MongoDB connection established")
    })

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection error:", err)
    })

    mongoose.connection.on('disconnected', () => {
        console.log("MongoDB disconnected")
    })

    // PREVIOUS: MongoDB Atlas (commented out due to timeout)
    // const mongoUri = "mongodb+srv://samalbismay42_db_user:DzqKCnEEjPpAyRd3@cluster0.0ljtbr4.mongodb.net/spotifydb?retryWrites=true&w=majority"

    // CURRENT: Local MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/spotify"
    
    try {
        await mongoose.connect(mongoUri, {
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
            retryWrites: true,
            w: "majority"
        })
        console.log("Database connected successfully!")
    } catch (error) {
        console.error("Database connection failed:", error.message)
        process.exit(1)
    }
}

export default connectDB;