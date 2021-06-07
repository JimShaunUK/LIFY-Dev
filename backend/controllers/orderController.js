import asyncHandler from 'express-async-handler'
import CustomerOrder from '../models/CustomerOrderModel.js'
import StoreOrder from '../models/StoreOrderModel.js'
import Product from '../models/ProductModel.js'
import Store from '../models/StoreModel.js'


const addOrderItems = asyncHandler(async (req, res) =>{

    
    const {
        cartItems,
        billingAddress,
        itemsPrice,
        delivery,
        deliveryFee,
        totalPrice,
        PostCode,
        } = req.body

        
    try{
    if (cartItems && cartItems.length===0){
        res.status(400)
        throw new Error('No items in order!')
        
    }
    else{
    //configure order data to schema
    const orderItems = cartItems
    const shippingAddress = billingAddress
    const postcode = PostCode
    const paymentMethod = "card/stripe"
    const processingPrice = 3
    const shippingPrice = deliveryFee
    //const totalPrice
    const isPaid = true
    const isCollection = delivery 
    const paidAt = new Date()
    
    const order = new CustomerOrder({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            processingPrice,
            totalPrice,
            postcode,
            processingPrice,
            shippingPrice,
            isPaid,
            isCollection,
            paidAt,
        })

    const createdOrder = await order.save()

    
    for(var i=0; i < orderItems.length; i++){
        var product = await Product.findById(orderItems[i].product)
        var store = await Store.findById(product.store)
        var price = orderItems[i].price * orderItems[i].qty
        var store_order = new StoreOrder({
            totalPrice: price,
            isCollection,
            customer: req.user._id,
            store: store._id,
            paymentMethod,
            orderItems:orderItems[i],
            isPaid
        })
        var createdStoreOrder = await store_order.save()
        createdOrder.storeOrders.push(createdStoreOrder)
        var end = await createdOrder.save()
    }
    
    
    res.status(201).json(createdOrder)
    }
}
catch(error){
    res.status(404)
    throw new Error(error)
}

})

const getOrderById = asyncHandler(async (req, res) =>{

    const order = await CustomerOrder.findById(req.params.id).populate('user', 'name email') 
    const status=[]
    if (order){

        if (!order.isReady){
            const attachedOrders = order.storeOrders
            for(var i=0; i<attachedOrders.length; i++){
                var found = await StoreOrder.findById(attachedOrders[i]._id)
                status.push(found.isReady)
            }
            console.log(status)
            if (status.includes(false)) {
                res.json(order)
            }
            else{
                order.isReady=true
                const update = await order.save()
                res.json(update)
            }
        }
        else{
            res.json(order)
        }
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})


const updateOrderToPaid = asyncHandler(async (req, res) =>{

    const order = await CustomerOrder.findById(req.params.id)

    if (order){
        order.isPaid = true;
        order.paidAt = Date.now()
        /*
        order.paymentResult = {
            id: req.body.id,
            status: "Complete"
        }
        */
    
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})

/*
const updateOrderDispatched = asyncHandler(async (req, res) =>{

    const order = await CustomerOrder.findById(req.params.id)

    if (order){
        order.isDelivered = true;
        order.deliveredAt = Date.now()
    
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})
*/

const updateOrderDispatched = asyncHandler(async (req, res) =>{

    const order = await StoreOrder.findById(req.params.id)

    if (order){
        order.isDispatched = true;
        order.isReady = true;
        
    
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found!')
        
    }

})

//GET users orders who are logged in
const getMyOrders = asyncHandler(async (req, res) =>{

    const orders = await CustomerOrder.find({user: req.user._id})
    res.json(orders)
   

})
    


 //GET ALL users orders who are logged in
const getOrders = asyncHandler(async (req, res) =>{

    const orders = await CustomerOrder.find({}).populate('user', "id name")
    res.json(orders)
   

})
    

export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderDispatched}