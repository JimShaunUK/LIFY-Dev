import express from 'express'
const router = express.Router()
import { 
    getRetailersByLocation,
    getRetailerById,
    registerRetailer,
    updateRetailer,
    getRetailerOrders,
    getRetailerOrderDetails,
    getRetailerDetails

 } from '../controllers/retailerController.js'
import {protect, adminCheck, retailerCheck} from '../middleware/authorizeMiddleware.js'

//get all retailers from backend by location
router.route('/town/:id').get(getRetailersByLocation)


//get one retailer
router.route('/:id').get(getRetailerById)

router.route('/orders/all').get(protect, getRetailerOrders)
router.route('/orders/all/:id').get(protect, getRetailerOrderDetails)

router.route('/find/:id').get(protect, retailerCheck, getRetailerDetails)

//register new retailer (ADMIN ONLY)
router.route('/create').post(protect, adminCheck, registerRetailer)

//update a retail outlet
router.route('/update').put(protect, retailerCheck, updateRetailer)

export default router

