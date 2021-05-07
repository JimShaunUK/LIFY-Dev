import express from 'express'
import dotenv from 'dotenv'

const app = express()


app.use(express.json())
dotenv.config()

app.get('/', (req, res)=>{
    res.send(`API is online...[[${process.env.NODE_ENV}]]`)
})

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`));
