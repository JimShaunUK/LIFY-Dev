import express from 'express'
const router = express.Router()
import { getRetailers, 
    getRetailerById,
    registerRetailer,
    updateRetailer,

 } from '../controllers/retailerController.js'
import {protect, adminCheck, retailerCheck} from '../middleware/authorizeMiddleware.js'

//get all retailers from backend by location
router.route('/').get(getRetailers)


//get one retailer
router.route('/:id').get(getRetailerById)

//register new retailer (ADMIN ONLY)
router.route('/create').post(protect, adminCheck, registerRetailer)

//update a retail outlet
router.route('/update').put(protect, retailerCheck, updateRetailer)

export default router