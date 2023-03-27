const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const cors=require('cors')
const userRoute = require('./src/Routes/UserRoutes')
const PostRoute = require('./src/Routes/PostRoutes')
const authCheck = require('./src/MiddleWares/authMiddleware')
require('dotenv').config()

//creating an express server
const app=express()

//creating connection between server and atlas
const connection=mongoose.connect(process.env.MongoAtlasURL)

//using all the middlewares
app.use(cors())
app.use(express.json())


//using all the Routers Created 

app.use('/users',userRoute)

app.use(authCheck)
app.use('/posts',PostRoute)



app.listen(process.env.BackendPort,async()=>{
    await connection
    console.log('connection established b/w db and server')
    console.log(`App is listening on port ${process.env.BackendPort}`)
})

