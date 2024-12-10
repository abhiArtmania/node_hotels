const mongoose = require('mongoose')

// Define mongodb connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'  //Database name is hotels

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