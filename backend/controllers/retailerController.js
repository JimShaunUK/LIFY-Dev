import asyncHandler from 'express-async-handler'
import Store from '../models/StoreModel.js'
import Town from '../models/TownModel.js'
import Product from '../models/ProductModel.js'
import StoreOrders from '../models/StoreOrderModel.js'

/*
const getRetailers = asyncHandler(async (req, res) =>{

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }

    }:{

    }
    const {lat, long} = req.body
    req.body.location = [lat, long]
    
    //get lat/long from user request
    const userlocation = req.body.location
    
    if (!userlocation){
        
        const presetLocation = await Town.find({})
        var data = {
            message: "Location unavailable, please select an established town",
            towns: presetLocation
        }
        return res.json(data)
        
    }

    //get store locations
    const towns = await Town.find({})
    
    //extract lat and long
    const locations = towns.map(loc => loc.location.coordinates)

    //define empty array
    let closest
    
    for (var i = 0; i < locations.length; i++) {
        // if this location is within 100KM of the user, add it to the list
        if (GetDistance(userlocation[0], userlocation[1], locations[i][0], locations[i][1], "K") <= 100) {
            closest = locations[i]
            break
        }
    }

    if (!closest){
        const presetLocation = await Town.find({})
        var data = {
            message: "No nearby locations, please select an established town",
            products: presetLocation
        }
        return res.json(data)
        
    }
    
    //find selected town with closest lat and long from DB
    const nearest = await Town.findOne({rawLocation:closest})

    //find all products from that town
    const retailers = await Store.find({town:nearest.name})
    
    //search feature not yet implemented
    //const products = await Product.find({...keyword})

    //shuffle items
    

    return res.json(retailers);
})
*/


const getRetailersByLocation = asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
        const townObj = await Town.findById(req.params.id)

        const retailers = await Store.find({town:townObj.name})

        if (retailers){
            
            
            res.json(retailers);
        }
        else{
            res.status(404)
            throw new Error('retailers not found!')
        }
    }else{
            res.status(404)
            throw new Error('town not found!')
    }
})




//get single product for product page
const getRetailerById = asyncHandler(async (req, res) =>{
     
    
        const store = await Store.findById(req.params.id)

    

        if (store){
            const location = await Town.find({name:store.town})
            
            //return a new object of a store and its component products
            var result = {
                town: location,
                shop: store
            }
            res.json(result)
        }
        else{
            res.status(404)
            throw new Error('Store not found!')
        }
   
})


//get single product for product page
const getRetailerOrders = asyncHandler(async (req, res) =>{
     
        

        const ref = await Store.findOne({owner:req.user._id})
        

        if (ref){
            const orders = await StoreOrders.find({store:ref._id})

            //console.log(orders)
            res.json(orders)
        }
        else{
            res.status(404)
            throw new Error('Error accessing store orders!')
        }
   
})

const getRetailerOrderDetails = asyncHandler(async (req, res) =>{

    const order = await StoreOrders.findById(req.params.id) 

    if (order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})

const getRetailerDetails = asyncHandler(async (req, res) =>{
    
    const retail = await Store.findOne({owner:req.user._id}) 

    if (retail){
        res.json(retail)
    }else{
        res.status(404)
        throw new Error('Store not found!')
        
    }

})

const getDashboard = asyncHandler(async (req, res) =>{
    
    const store = await Store.findOne({owner:req.user.id})

    const orders = await StoreOrders.find({store:store._id})

    var total = 0;
    
    for(var i=0; i < orders.length;i++){
        total+=orders[i].totalPrice
    }

    res.json(
        {
            total: total,
            orderCount:orders.length,
        }
    )

})




//function to find nearest 
function GetDistance(lat1, lon1, lat2, lon2, unit) {
    	var radlat1 = Math.PI * lat1/180
    	var radlat2 = Math.PI * lat2/180
    	var theta = lon1-lon2
    	var radtheta = Math.PI * theta/180
    	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	if (dist > 1) {
    		dist = 1;
    	}
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60 * 1.1515
    	if (unit=="K") { dist = dist * 1.609344 }
    	if (unit=="N") { dist = dist * 0.8684 }
    	return dist
    }


    //retailer/admin routes

//Register new Retailer
const registerRetailer = asyncHandler(async (req, res) =>{
    const {name, email, phone, address, owner, category, town, location} = req.body
    const storeExists= await Store.findOne({email})

    if (storeExists){
        res.status(400)
        throw new Error('Store Already Registered!')
    }

    const store = await Store.create({
        name,
        email,
        phone,
        address, 
        owner,
        category,
        town,
        location,
    })

    if(store){
        res.status(201).json({
            store
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid store data, store not created!')
    }

})

//UPDATE USer Profile
const updateRetailer = asyncHandler(async (req, res) =>{

   const store = await Store.find({owner:req.user._id})

   if (store){
    store.name = req.body.name || store.name
    store.email = req.body.email || store.email
    store.phone = req.body.phone || store.phone
    store.address = req.body.address || store.address
  
    if (req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address:updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            isRetailer: updatedUser.isRetailer,
            isCourier: updatedUser.isCourier,
            isVerified:updatedUser.isVerified,
        token: generateToken(updatedUser._id)
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})

export {
    getRetailersByLocation,
    getRetailerById,
    registerRetailer,
    updateRetailer,
    getRetailerOrders,
    getRetailerOrderDetails,
    getRetailerDetails,
    getDashboard,
}

