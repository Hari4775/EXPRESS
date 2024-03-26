const express = require('express');
require('dotenv').config();
const contactRouter= require ('./Routes/ContactRoutes');
const userRouter = require('./Routes/UserRoutes')
const errorhandler = require('./Middleware/ErrorHandler');
const connectDB = require('./config/DBconnect');

const app= express()
const port = process.env.PORT ||5001
connectDB()

app.use(express.json()) // USED FOR GETTING DATA FROM USER -- GET DATA FROM  POST METHOD

app.use('/api/contact',contactRouter)
app.use('/api/user/',userRouter)
app.use(errorhandler)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})