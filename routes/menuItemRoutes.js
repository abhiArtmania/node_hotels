const express = require('express')
const router = express.Router()

//Imported MenuItem model
const MenuItem = require('./../models/MenuItem')

//Get Menu Items
router.get('/', async (req,res)=>{
    try{
        const menuItems = await MenuItem.find()
        console.log("Data fetched successfuly")
        res.status(200).json(menuItems)
    } catch(error){
        console.log(`Error while fetching menu items: ${error}`)
        res.status(500).json({error:'Internal server error'})
    }
})

//Save Menu Items
router.post('/save', async (req, res)=>{
    try{
        const data = req.body
        const menuItem = new MenuItem(data)
        const savedMenuItem = await menuItem.save()
        console.log(`Menu Items saved successfuly`)
        res.status(200).json(savedMenuItem)
    } catch(error){
        console.log(`Error in saving MenuItem: ${error}`)
        res.status(500).json({error: 'Internal server error'})
    }
})

//Get the list of menu item having a specific taste
router.get('/:tasteType', async (req,res)=>{
    try{
        const tasteType = req.params.tasteType
        if(['sweet','spicy', 'sour'].includes(tasteType)){
            const menuDetails = await MenuItem.find({taste:tasteType})
            res.status(200).json(menuDetails)
        } else {
            res.status(404).json({error:'Invalid tast type'})
        }
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})

//Update a menu
router.put('/:id', async (req,res)=>{
    try{
        const menuItemId = req.params.id
        const menuItemToBeUpdate = req.body
        const response = await MenuItem.findByIdAndUpdate(menuItemId,menuItemToBeUpdate,{
            new:true,  //Return the updated document
            runValidators: true  //Run mongoose validation
        })
        if(!response){
            res.status(404).json({error:'Menu item not found'})
        }
        res.status(200).json(response)
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})

//Delete menu item by id
router.delete('/:id', async (req,res)=>{
    try{
        const menuItemId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuItemId)
        if(!response){
            res.status(404).json({error:'Menu item not found'})
        }
        res.status(200).json({message:'Menu item deleted successfuly'})
    } catch(error){
        res.status(500).json({error:'Internal server error'})
    }
})

module.exports = router