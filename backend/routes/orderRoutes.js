import express from 'express'
const router = express.Router()
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderDispatched
} from '../controllers/orderController.js'
import {protect, adminCheck, retailerCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend

router.route(('/')).get(protect, adminCheck, getOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/new').post(protect, addOrderItems)
router.route(('/:id')).get(protect, getOrderById)



router.route(('/:id/pay')).put(protect, updateOrderToPaid)
router.route(('/:id/dispatch')).put(protect, retailerCheck, updateOrderDispatched)

export default router