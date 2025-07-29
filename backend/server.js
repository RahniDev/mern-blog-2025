import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path';
import { fileURLToPath } from 'url';  // To get current file path
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'imgUploads');

if (!fs.existsSync(uploadDir)) {
   fs.mkdirSync(uploadDir);
}
const app = express()


const corsOptions = {
 origin: 'http://localhost:5173',
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization'],
 credentials: true,
};

app.use(cors(corsOptions));


mongoose.connect(process.env.DB)
mongoose.connection
 .once("open", function () {
   console.log("DB Connected!");
 })
 .on("error", function (error) {
   console.log("Error is: ", error);
 });


app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())


import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'


app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/posts', postRoutes)


const port = process.env.PORT || 80


app.listen(port, () => {
 console.log(`Server is running on port ${port}`)
})
