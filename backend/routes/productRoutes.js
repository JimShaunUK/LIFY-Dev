import express from 'express'
const router = express.Router()
import { 
    getProductsByLocation, 
    getProductById,
    getProductsByRetailer
 } from '../controllers/productController.js'
import {protect, adminCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend
router.route('/:id').get(getProductsByLocation)

router.route('/retailer/:id').get(getProductsByRetailer)

//get one product
router.route('/view/:id').get(getProductById)

export default router