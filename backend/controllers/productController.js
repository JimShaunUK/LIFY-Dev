import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'
import Town from '../models/TownModel.js'
import Store from'../models/StoreModel.js'


/*const getProducts = asyncHandler(async (req, res) =>{
    
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
*/
const getProductsByLocation = asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
        const townObj = await Town.findById(req.params.id)

        const products = await Product.find({town:townObj.name})

        if (products){
            const result = shuffleArray(products)
            
            res.json(result);
        }
        else{
            res.status(404)
            throw new Error('products not found!')
        }
    }else{
            res.status(404)
            throw new Error('town not found!')
    }
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
        const productDetails = await Product.findById(req.params.id)


        if (productDetails){
            const store = await Store.findById(productDetails.store)
            const location = await Town.find({name:productDetails.town})
            //return a new object of a store and its component products
            productDetails.store= store
            productDetails.townData = location[0]

            res.json(productDetails)
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


//get single product for product page
const getProductsByRetailer= asyncHandler(async (req, res) =>{
     
    if (req.params.id.length ===24){
        const products = await Product.find({store:req.params.id})

        if (products){
        const store = await Store.findById(products[0].store)

        
        const location = await Town.find({name:products[0].town})
            //return a new object of a store and its component products
        var retailerData = {
            products,
            store,
            location:location[0]
        }
        res.json(retailerData)
        }
    
    }else{
        res.status(404)
        throw new Error('retailer found!')
    }
      

})

const searchProducts = asyncHandler(async (req, res) =>{

    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }

    }:{

    }

    console.log("product request")

    const products = await Product.find({...keyword})
    const retailers = await Store.find({...keyword})
    const towns = await Town.find({...keyword})

    const result = {
        products,
        retailers,
        towns,
    }
    res.json(result);
})


const getManageProductList= asyncHandler(async (req, res) =>{
     
    const id = req.user.id

    const retailer = await Store.findOne({owner:id})

    if(retailer){
        const products = await Product.find({store:retailer._id})
        res.json(products)
    }else{
        res.status(404)
        throw new Error('Retailer/Products not found!')
    }
      

})

//ADMIN DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) =>{
     const product = await Product.findById(req.params.id)

    if (product){
        await product.remove()
        res.json({message:"Product Deleted!"})
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }
})

//ADMIN CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) =>{
   
    const product = new Product({
        name:"Sample Name",
        price: 0,
        user: req.user._id,
        artist: "Sample Artist",
        stock: 0,
        image: '/images/sample.jpg',
        description: 'Sample Description'
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

//ADMIN UPDATE PRODUCT
//ADMIN CREATE PRODUCT
const updateProduct = asyncHandler(async (req, res) =>{
   
        
    const{name, price, description, artist, stock, image} = req.body

    const product = await Product.findById(req.params.id)

    if (product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.stock = stock
        product.artist = artist

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('Product not found!')
    }


        

    
})

export {
    getProductsByLocation,
    getManageProductList,
    getProductById,
    getProductsByRetailer,
    searchProducts,
    createProduct,
    deleteProduct,
    updateProduct
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
