import mongoose from 'mongoose'
import dotenv from 'dotenv'

//import data sets
import users from '../data/users.js'
import stores from '../data/stores.js'
import towns from '../data/towns.js'
import products from '../data/products.js'
import orders from '../data/customer_order.js'
import storeOrders from '../data/store_order.js'

//import models
import User from '../models/UserModel.js'
import Store from '../models/StoreModel.js'
import Town from '../models/TownModel.js'
import Product from '../models/ProductModel.js'
import Order from '../models/CustomerOrderModel.js'
import StoreOrder from '../models/StoreOrderModel.js'

//DB connection
import connectDB from '../config/db.js'


dotenv.config()
connectDB()

const importUserData= async () =>{
    try{
        //await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        console.log('Data [USERS] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

const importStoreData= async () =>{
    try{
        //await Store.deleteMany()

        const createdStores = await Store.insertMany(stores)

        console.log('Data [STORE] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

const importTownData= async () =>{
    try{
        await Town.deleteMany()

        const createdTowns = await Town.insertMany(towns)

        console.log('Data [TOWN] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

const importProductData= async () =>{
    try{
        await Product.deleteMany()

        const createdProducts = await Product.insertMany(products)

        console.log('Data [PRODUCTS] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

const importOrderData= async () =>{
    try{
        

        const createdOrder = await Order.insertMany(orders)

        console.log('Data [TEST ORDER] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

const importStoreOrderData= async () =>{
    try{
        //clear existing data
        
        //create store orders
        const storesorders = await StoreOrder.insertMany(storeOrders)

        //find original customer order
        const order = await Order.findById("60a76aeff6cd52630b531444")

        //assign new store orders to original customer order
        order.storeOrders = storesorders

        //save to db
        const updatedOrder = await order.save()

        //print for debugging
        console.log(updatedOrder)
        console.log('Data [STORE ORDERS] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}


const importIncompleteData = async () =>{
    try{
        const createdTown = await Town.create({
            name: 1001,
            location: "Street"
        })

        console.log('Data [TEST TOWN] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}



const importIDFixes= async () =>{
    try{
        //clear existing data
        
        //update owner ID 1
        const store = await Store.findById("609fc28e0043ba2e7d51004f")

        store.owner = "609e80e9b3cf5a296e4d9ff7"

        const updatedStore = await store.save()

            //update owner ID 1
        const store1 = await Store.findById("609fc28e0043ba2e7d510051")

        store1.owner = "609e80e9b3cf5a296e4d9ff8"

        const updatedStore1 = await store1.save()

            //update owner ID 1
        const store2 = await Store.findById("609fc28e0043ba2e7d510053")

        store2.owner = "609e80e9b3cf5a296e4d9ff9"

        const updatedStore2 = await store2.save()
     
        console.log('Data [STORE IDs] Import Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}

/*
const destroyData= async () =>{
    try{
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

      
        console.log('Data Destruction Complete!')
        process.exit()

    }
    catch(err){
        console.error({err})
        process.exit(1)
    }
}
*/
if (process.argv[2]=== '-d'){
    destroyData()
}
else if(process.argv[2]=== '-s'){
   importStoreData()
}
else if(process.argv[2]=== '-t'){
   importTownData()
}
else if(process.argv[2]=== '-p'){
   importProductData()
}
else if(process.argv[2]=== '-o'){
   importOrderData()
}
else if(process.argv[2]=== '-so'){
   importStoreOrderData()
}
else if(process.argv[2]=== '-tst'){
   importIncompleteData()
}
else if(process.argv[2]=== '-f'){
   importIDFixes()
}
else{
    importUserData()
}
