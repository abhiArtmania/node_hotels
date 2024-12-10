const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()

const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
// Use app.use to use any middleware
app.use(bodyParser.json())

// Imported routes
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person',personRoutes)
app.use('/menuItem',menuItemRoutes)

app.listen(port,()=>{
    console.log("Listening at port")
})
