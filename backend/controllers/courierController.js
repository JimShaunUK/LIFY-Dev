import asyncHandler from 'express-async-handler'
import CustomerOrder from '../models/CustomerOrderModel.js'
import StoreOrder from '../models/StoreOrderModel.js'
import Product from '../models/ProductModel.js'
import Store from '../models/StoreModel.js'

 //GET ALL users orders who are logged in
const getAvailableOrders = asyncHandler(async (req, res) =>{

    const orders = await CustomerOrder.find({isReady:true, isCollection:false})
    res.json(orders)

})

const acceptOrder = asyncHandler(async (req, res) =>{

    const order = await CustomerOrder.findById(req.params.id)

    if (order){
        order.isAssignedCourier = true;
        order.assignedCourier = req.user._id
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})

const getData = asyncHandler(async (req, res) =>{

    console.log('HIT')

    const order = await CustomerOrder.findById(req.params.id)
    console.log(order)
    const stops = []

    if (order){

        var mapData = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBVidQMyEBxQ_5GYdgjww7Pd3jsgXZ8gUw"
        
//&origin=ta11nr&destination=ta26hg

        for(var i=0; i<order.storeOrders.length; i++){
            var storeOrder = await StoreOrder.findById(order.storeOrders[i]._id)
            var store = await Store.findById(storeOrder.store)
           
            stops.push(store)
        }

        mapData+=`&origin=${stops[0].address.slice(stops[0].address.length - 6)}&destination=${order.postcode}&waypoints=`
        
        for(var i=1; i<stops.length; i++){
            mapData+=`${stops[i].address.slice(store.address.length - 6)}`
            if (i == stops.length-1){
                break;
            }else{
                mapData+=`|`
            }
        }
        mapData+=`&mode=bicycling`
        console.log(mapData)
        res.json({
            stops: stops,
            mapData: mapData,
            customerPostcode: order.postcode,
        })
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})

const completeDelivery = asyncHandler(async (req, res) =>{

    var order = await CustomerOrder.findById(req.params.id)

    if (order){
        order.isDelivered=true
        order.deliveredAt = new Date()
        const updatedOrder = order.save()
        res.json({message: `delivery marked as complete: ${order.deliveredAt}`})
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }
    
    /*
    const order = await CustomerOrder.findById(req.params.id)

    if (order){
        order.isAssignedCourier = true;
        order.assignedCourier = req.user._id
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }
    */

})

    

export {getAvailableOrders, acceptOrder, getData, completeDelivery}