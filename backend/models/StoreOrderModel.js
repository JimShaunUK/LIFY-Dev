import mongoose from 'mongoose'

const store_orderSchema = mongoose.Schema({
    customer:{
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
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref: "Product"
            },
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isCollection:{
        type:Boolean,
        required:true,
        default:false,
    },
    isReady:{
        type:Boolean,
        required:true,
        default:false
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Store'
    },
    paymentRef:{
        id:{type:String},
        status:{type:String},
    },
    paymentMethod:{
        type:String,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date,
    },
    isDispatched:{
        type:Boolean,
        default:false
    },
    deliveredAt:{
        type:Date
    }
},{
    timestamps:true
})

const Store_Order= mongoose.model('Store_Order', store_orderSchema)
export default Store_Order