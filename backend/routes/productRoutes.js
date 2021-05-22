import express from 'express'
const router = express.Router()
import { getProducts, 
    getProductById, 
 } from '../controllers/productController.js'
import {protect, adminCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend
router.route('/').get(getProducts)


//get one product
router.route('/:id').get(getProductById)

export default router