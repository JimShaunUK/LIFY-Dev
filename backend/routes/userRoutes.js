import express from 'express'
const router = express.Router()
import { authUser, 
    getUsers, 
    getUserProfile, 
    registerUser, 
    verifyUser,
    registerRetailUser,
    registerCourierUser,
    updateUserProfile, 
    deleteUser,
    getUserById,
    updateUser,
    getCustomer
} from '../controllers/userController.js'
import {protect, adminCheck, retailerCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend

router.route('/').post(registerUser).get(protect, adminCheck, getUsers)

//special users
router.route('/retail/register').post(protect, adminCheck, registerRetailUser)
router.route('/deliver').post(registerCourierUser)

//verify retailer and courier
router.route('/verify/:id').put(protect, adminCheck, verifyUser)

//login and generic routes
router.post('/login', authUser)

//get customer info
router.route('/customer/:id').get(protect, retailerCheck, getCustomer)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, adminCheck, deleteUser).get(protect, adminCheck, getUserById).put(protect, updateUser)


export default router