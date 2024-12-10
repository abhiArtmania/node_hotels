const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
// Use app.use to use any middleware
app.use(bodyParser.json())

// Imported routes
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person',personRoutes)
app.use('/menuItem',menuItemRoutes)

app.listen(3000,()=>{
    console.log("Listening at port")
})
