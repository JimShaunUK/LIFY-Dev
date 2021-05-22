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

const storeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default: "images/sampleretail.png",
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    category:{
        type:String,
        required: true
    },
    town: {
        type:String, 
        required:true
    },
    location: geoSchema  
},{
    timestamps:true
})


const Store = mongoose.model('Store', storeSchema)
export default Store

