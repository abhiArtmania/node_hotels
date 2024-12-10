const mongoose = require('mongoose');

// Define Persone Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager','owner'],
        required: true
    },
    address:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salary:{
        type: Number,
        required: true
    }
})

// Create person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;