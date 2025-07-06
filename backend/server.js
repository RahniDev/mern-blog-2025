const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const { query } = require('express-validator');
const morgan = require('morgan')

dotenv.config()

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')

const app = express()

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

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/posts', postRoutes)

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})