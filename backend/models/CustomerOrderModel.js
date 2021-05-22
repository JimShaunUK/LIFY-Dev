import mongoose from 'mongoose'

const customer_orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            store:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Store"
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref: "Product"
            },
        }
    ],
    storeOrders:[
        {
            store_orders: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Store_Orders"
            },
        }
    ],
    shippingAddress:{
        address:{type: String, required:true},
        city:{type: String, required:true},
        county:{type: String, required:true},
        postcode:{type: String, required:true}
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentRef:{
        id:{type:String},
        status:{type:String},
    },
    processingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    deliveryPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date,
    },
    isCollection:{
        type:Boolean,
        required:true,
        default:false,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    isDispatched:{
        type:Boolean,
        required:true,
        default:false
    },
    isReady:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAt:{
        type:Date
    }
},{
    timestamps:true
})

const Customer_Order= mongoose.model('Customer_Order', customer_orderSchema)
export default Customer_Order