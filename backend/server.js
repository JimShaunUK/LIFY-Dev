import express from 'express'
import dotenv from 'dotenv'
import dbconnect from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'
//stripe libraries
import stripe from 'stripe'
const stripeData = new stripe('sk_test_51IUavEFV3SCXvY9fJ1bhZnVp2634qcHKHjq3qWX7yddcUF6iOFzFuQSrsZz2k0m0404PXkthuuQta3KQQM18rsvL006Yff0nVV')


//routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import retailerRoutes from './routes/retailerRoutes.js'
import townRoutes from './routes/townRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import courierRoutes from './routes/courierRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
const app = express()


app.use(express.json())
dotenv.config()
dbconnect()

//implement routing
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/retailer', retailerRoutes)
app.use('/api/towns', townRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/courier', courierRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/stripe', (req, res) =>{res.send(process.env.STRIPE_CLIENT_ID)})
//TRY Stripe
app.post('/stripe', async (req, res) => {

  //user sends price along with request
  const userPrice = parseInt(req.body.price)*100;

  //create a payment intent
  const intent = await stripeData.paymentIntents.create({
    
    //use the specified price
    amount: userPrice,
    currency: 'gbp'

  });

  //respond with the client secret and id of the new paymentintent
  res.json({client_secret: intent.client_secret, intent_id:intent.id});

})

//handle payment confirmations
app.post('/confirm-payment', async (req, res) => {

  //extract payment type from the client request
  const paymentType = String(req.body.payment_type);

  //handle confirmed stripe transaction
  if (paymentType == "stripe") {

    //get payment id for stripe
    const clientid = String(req.body.payment_id);

    //get the transaction based on the provided id
    stripeData.paymentIntents.retrieve(
      clientid,
      function(err, paymentIntent) {

        //handle errors
        if (err){
          console.log(err);
        }
        
        //respond to the client that the server confirmed the transaction
        if (paymentIntent.status === 'succeeded') {

          /*YOUR CODE HERE*/  
          
          console.log("confirmed stripe payment: " + clientid);
          res.json({success: true});
        } else {
          res.json({success: false});
        }
      }
    );
  } 
  
})

app.get('/', (req, res)=>{
    res.send(`API is online...[[${process.env.NODE_ENV}]]`)
})





if(process.env.NODE_ENV === 'production'){

  app.use(express.static(__dirname+'/frontend/build'))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })

}else{
  app.get('/', (req, res)=>{
    res.send('API is online...')
  })
}

//import middleware
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));
