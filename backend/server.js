import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import { body, validationResult } from 'express-validator';
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
}); 

import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/posts.js'

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
// used to save users credentials
app.use(cookieParser())
app.use(cors())

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/posts', postRoutes)

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})