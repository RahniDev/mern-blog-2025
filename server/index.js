const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
dotenv.config()


mongoose.connect(process.env.DB)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
