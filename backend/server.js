import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js'
import connectDB from './src/config/mongodb.js'
import connectCloudinary from './src/config/cloudinary.js'

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());             //connect bcknd frntnd even if diff port

// initialize routes
app.get('/',(req,res)=>res.send("APi working"))

app.listen(port,()=>console.log(`Server on ${port}`))