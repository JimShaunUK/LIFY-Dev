import express from 'express'
const router = express.Router()
import { 
    getAvailableOrders,
    acceptOrder,
    getData,
    completeDelivery
} from '../controllers/courierController.js'
import {protect, courierCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend

router.route('/').get(protect, courierCheck, getAvailableOrders)
router.route('/:id').get(protect, courierCheck, getData).put(protect, courierCheck, acceptOrder)
router.route('/complete/:id').put(protect, courierCheck, completeDelivery)
export default router