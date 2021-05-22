import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async(req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //console.log('Token Found')
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log(decoded)

            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user)
            next()
        }
        catch(error){
                console.error(error)
                res.status(401)
                throw new Error('Not Authorised: Token Failed to Authenticate')
        }
        
    }

    if (!token){
        res.status(401)
        throw new Error('No Authorisation token!')
    }

    
})

const adminCheck = (req, res, next)=>{

if(req.user && req.user.isAdmin){
    next()
}
else{
    res.status(401)
    throw new Error('Not Authorised to Access Admin Route!')
}

}

const retailerCheck = (req, res, next)=>{

if(req.user && req.user.isRetailer){
    next()
}
else{
    res.status(401)
    throw new Error('Not Authorised to Access Retailer Controls!')
}

}

const courierCheck = (req, res, next)=>{

if(req.user && req.user.isRetailer){
    next()
}
else{
    res.status(401)
    throw new Error('Not Authorised to Access Courier Controls!')
}

}

export {protect, adminCheck, courierCheck, retailerCheck}