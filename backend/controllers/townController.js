import asyncHandler from 'express-async-handler'
import Town from '../models/TownModel.js'
import Product from '../models/ProductModel.js'
import Store from '../models/StoreModel.js'


const getTownById = asyncHandler(async (req, res) =>{
     
    const town = await Town.findById(req.params.id)

    res.json(town)
    
})



//get single product for product page
const getTowns = asyncHandler(async (req, res) =>{
     
    const towns = await Town.find({})

    res.json(towns)
    
})

//get single product for product page
const getProductsByTown = asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
        const Reqtown = await Town.findById(req.params.id)

        const products = await Product.find({town:Reqtown.name})

        if (products){
            res.json(products);
        }
        else{
            res.status(404)
            throw new Error('no products found!')
        }
    }else{
            res.status(404)
            throw new Error('town not found!')
    }
})

const getRetailersByTown = asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
        const Reqtown = await Town.findById(req.params.id)

        const stores = await Store.find({town:Reqtown.name})

        if (stores){
            res.json(stores);
        }
        else{
            res.status(404)
            throw new Error('no stores found!')
        }
    }else{
            res.status(404)
            throw new Error('town not found!')
    }
})

export {
    getTownById,
    getTowns,
    getProductsByTown,
    getRetailersByTown,
   
}