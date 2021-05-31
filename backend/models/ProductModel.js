import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    town:{
        type:String,
        required:true,
    },
     image:{
        type:String,
        required:true,
        default: '/images/sample.jpg'
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
   store:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Store'
    },
    townData:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Town'
    },
    description:{
        type:String,
        required: true
    },
    canDeliver:{
        type:Boolean,
        required: true,
        default:false
    },
},{
    timestamps:true
})

const Product = mongoose.model('Product', productSchema)
export default Product