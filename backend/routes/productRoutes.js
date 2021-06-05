import express from 'express'
const router = express.Router()
import { 
    getProductsByLocation, 
    getProductById,
    getProductsByRetailer,
    searchProducts,
    getManageProductList,
    deleteProduct,
    updateProduct,
    createProduct
 } from '../controllers/productController.js'
import {protect, adminCheck, retailerCheck} from '../middleware/authorizeMiddleware.js'


router.route('/').post(protect, retailerCheck, createProduct)
//get all products from backend
router.route('/:id').get(getProductsByLocation)

router.route('/all/search').get(searchProducts)

router.route('/retailer/:id').get(getProductsByRetailer)

router.route('/manage/products').get(protect, retailerCheck, getManageProductList)

//get one product
router.route('/view/:id').get(getProductById)

router.route('/:id').delete(protect, retailerCheck, deleteProduct).put(protect, retailerCheck, updateProduct)

export default router