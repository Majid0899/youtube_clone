import express from 'express';
import dotenv from 'dotenv'
import { createConnection } from './db.js';
import userRouter from './Routes/userRoute.js'
import videoRouter from './Routes/videoRoute.js'
import cors from 'cors'
import channelRouter from './Routes/channelRoute.js'
import { jwtAuthMiddleware } from './Middlewares/auth.js';


dotenv.config()

//establish a connection
createConnection();

//Create an app
const app=new express();

/* JSON Middleware */
app.use(express.json())

app.use(cors())

const PORT=process.env.PORT || 5000;

app.use("/user",userRouter)
app.use("/channel",jwtAuthMiddleware,channelRouter)

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})