import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'
import Town from '../models/TownModel.js'



const getProducts = asyncHandler(async (req, res) =>{
    
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
    const townProducts = await Product.find({town:nearest.name})
    
    //search feature not yet implemented
    //const products = await Product.find({...keyword})

    //shuffle items
    const items = shuffleArray(townProducts)

    return res.json(items);
})

function shuffleArray(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    return items;
}

//get single product for product page
const getProductById = asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
    const product = await Product.findById(req.params.id)

    

        if (product){
            res.json(product);
        }
        else{
            res.status(404)
            throw new Error('Product not found!')
        }
    }else{
            res.status(404)
            throw new Error('Product not found!')
    }
})

export {
    getProducts,
    getProductById,
   
}

//
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
