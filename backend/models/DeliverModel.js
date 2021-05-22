import mongoose from 'mongoose'

const geoSchema = mongoose.Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
})

const deliverySchema = mongoose.Schema({
    courier:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    customerOrder:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Customer_Order'
    },
    started:{
        type:Boolean,
        required:true,
        default:false,
    },
    complete:{
        type:Boolean,
        required:true,
        default:false,
    },
    address:{
        type:String,
        required:true,
    },
    deliveryLocation:geoSchema,
    
    stops:{
        type:Number,
        required:true,
        default:0
    },
    pickUpLocations:[{
        location: geoSchema
    }  
    ]
    ,
        location: geoSchema  
},{
    timestamps:true
})



const Delivery = mongoose.model('Delivery', deliverySchema)
export default Delivery

