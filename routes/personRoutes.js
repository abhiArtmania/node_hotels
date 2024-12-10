const express = require('express')
const router = express.Router()

//Imported the Person model
const Person = require('./../models/Person')


//Get Person of hotels
router.get('/', async (req,res)=>{
    try{
        const savedPersons = await Person.find()
        console.log("Data fetched successfuly")
        res.status(200).json(savedPersons)
    } catch(error){
        console.log(`Error while fetching person data: ${error}`)
        res.status(500).json({ error: 'Internal server error'})
    }
})

//Save persons
router.post('/save', async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data)
        const savedPerson = await newPerson.save()
        console.log('Data saved successfuly')
        res.status(200).json(savedPerson)
    } catch(error){
        console.log(`Error on saving person data: ${error}`)
        res.status(500).json({ error: 'Internal server error'})
    }
})

//Get the list of persons having a specific workType
router.get('/:workType', async (req, res)=>{
    try{
        const workType = req.params.workType
        if(['chef','waiter','manager','owner'].includes(workType)){
            const response = await Person.find({work: workType})
            res.status(200).json(response)
        } else {
            res.status(404).json({error:'Invalid work type'})
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})

//Update the person details
router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id
        const personDataToBeUpdate = req.body
        const response = await Person.findByIdAndUpdate(personId,personDataToBeUpdate,{
            new: true,   // Return the updated document
            runValidators: true  // Run mongoose validation
        })
        if(!response){
            res.status(404).json({error:'Person not found'})
        }
        res.status(200).json(response)
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})

//Delete a person
router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(404).json({error:'Person not found'})
        }
        res.status(200).json({message:'Person deleted successfully'})
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})


module.exports = router