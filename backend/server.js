import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'comhttps://mern-blog-2025.onrender.' 
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOptions))


mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection
  .once("open", () => console.log("DB Connected!"))
  .on("error", (error) => console.log("DB Error:", error))


app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/posts', postRoutes)


const buildPath = path.join(__dirname, '..', 'client', 'build')
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
