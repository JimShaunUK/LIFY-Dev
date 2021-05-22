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

const townSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    location: geoSchema,
    rawLocation:{
        type:[Number],
        required:true
    },
    storeCount: {
        type:Number,
        required:true,
        default:0
    }  
},{
    timestamps:true
})


const Town = mongoose.model('Town', townSchema)
export default Town

