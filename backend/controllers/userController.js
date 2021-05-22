import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'


//@desc  AUTH User and get token
//@route post /api/users/login
//public 
const authUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address:user.address,
            isAdmin: user.isAdmin,
            isRetailer: user.isRetailer,
            isCourier: user.isCourier,
            isVerified:user.isVerified,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }
})




//@desc  GET user profile
//@route GET /api/users/profile
//private
const getUserProfile = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.user._id)

   if (user){
    res.json({
        _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address:user.address,
            isAdmin: user.isAdmin,
            isRetailer: user.isRetailer,
            isCourier: user.isCourier,
            isVerified:user.isVerified,
    })
   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})



//@desc  REGISTER A NEW USER
//@route POST /api/users
//public 
const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password, address, phone} = req.body
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Registered!')
    }

    const user = await User.create({
        name,
        email,
        password,
        phone, 
        address,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address:user.address,
            isAdmin: user.isAdmin,
            isRetailer: user.isRetailer,
            isCourier: user.isCourier,
            isVerified:user.isVerified,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//@desc  REGISTER A NEW RETAILER USER
//@route POST /api/retailer/users
//public 
const registerRetailUser = asyncHandler(async (req, res) =>{
    const {name, email, password, address, phone, isRetailer, isVerified} = req.body
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Registered!')
    }

    const user = await User.create({
        name,
        email,
        password,
        phone, 
        address,
        isRetailer,
        isVerified
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address:user.address,
            isAdmin: user.isAdmin,
            isRetailer: user.isRetailer,
            isCourier: user.isCourier,
            isVerified:user.isVerified,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const registerCourierUser = asyncHandler(async (req, res) =>{
    const {name, email, password, address, phone, isCourier} = req.body
    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Registered!')
    }

    const user = await User.create({
        name,
        email,
        password,
        phone, 
        address,
        isCourier
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address:user.address,
            isAdmin: user.isAdmin,
            isRetailer: user.isRetailer,
            isCourier: user.isCourier,
            isVerified:user.isVerified,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//UPDATE USer Profile
const updateUserProfile = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.user._id)

   if (user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.isAdmin = req.body.isAdmin || user.isAdmin
    user.isRetailer = req.body.isRetailer || user.isRetailer
    user.isRetailer = req.body.isRetailer || user.isRetailer
    user.isVerified = req.body.isVerified || user.isVerified

    if (req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address:updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            isRetailer: updatedUser.isRetailer,
            isCourier: updatedUser.isCourier,
            isVerified:updatedUser.isVerified,
        token: generateToken(updatedUser._id)
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})



//ADMIN ONLY

const getUsers = asyncHandler(async (req, res) =>{

   const users = await User.find({})
   res.json(users)
})


const deleteUser = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id)
   if (user){
        await user.remove()
        res.json({message: 'User removed!'})
   }
   else{
       res.status(404)
       throw new error('User not found!')
   }
})


const getUserById = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id).select('-password')

    if (user){
        res.json(user)
    }
    else{
        throw new Error('User not found!')
    }
   
})


//VERIFY USER
//UPDATE Specific User
const verifyUser = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id)

   if (user){
  
    user.isVerified = req.body.isVerified || user.isVerified
   
    const updatedUser = await user.save()

      res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address:updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            isRetailer: updatedUser.isRetailer,
            isCourier: updatedUser.isCourier,
            isVerified:updatedUser.isVerified
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})




//UPDATE Specific User
const updateUser = asyncHandler(async (req, res) =>{

   const user = await User.findById(req.params.id)

   if (user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address = req.body.address || user.address
    user.isAdmin = req.body.isAdmin || user.isAdmin
    user.isRetailer = req.body.isRetailer || user.isRetailer
    user.isRetailer = req.body.isRetailer || user.isRetailer
    user.isVerified = req.body.isVerified || user.isVerified
    
    if (req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()

      res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address:updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            isRetailer: updatedUser.isRetailer,
            isCourier: updatedUser.isCourier,
            isVerified:updatedUser.isVerified
     })

   }
   else{
       res.status(404)
       throw new Error('User Account Not Found!')
   }

})

export {registerUser, verifyUser, registerCourierUser, registerRetailUser, getUserProfile, authUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}
