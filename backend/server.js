import express from 'express'
import dotenv from 'dotenv'
import dbconnect from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

//routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import retailerRoutes from './routes/retailerRoutes.js'

const app = express()


app.use(express.json())
dotenv.config()
dbconnect()

//implement routing
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/retailer', retailerRoutes)

app.get('/', (req, res)=>{
    res.send(`API is online...[[${process.env.NODE_ENV}]]`)
})




//import middleware
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));
