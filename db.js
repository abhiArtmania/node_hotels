const mongoose = require('mongoose')
require('dotenv').config()
// Define mongodb connection url
// const mongoURL = process.env.DB_URL_LOCAL  //local server of mongo db
const mongoURL = process.env.DB_URL  //Online server of mongo db

// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('DB Connection established')
})

db.on('disconnected',()=>{
    console.log('DB disconnected')
})

db.on('error',(err)=>{
    console.log(`DB connection error: ${err}`)
})

module.exports = db;