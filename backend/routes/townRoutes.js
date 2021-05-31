import express from 'express'
const router = express.Router()
import {
     getTownById, 
     getTowns
 } from '../controllers/townController.js'
import {protect, adminCheck} from '../middleware/authorizeMiddleware.js'

//get all products from backend
router.route('/').get(getTowns)

router.route('/:id').get(getTownById)



export default router