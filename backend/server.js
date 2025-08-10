import express from 'express';
import dotenv from 'dotenv'
import { createConnection } from './db.js';
import userRouter from './Routes/userRoute.js'
import cors from 'cors'


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


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
})