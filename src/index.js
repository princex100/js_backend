import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import express from "express"
import { dbconnect } from "./db/db.js";

dbconnect()


// const app=express();
// ;(async()=>{
//   try{
//       const res=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//       app.on("error",(err)=>{
//         console.log(err)
//       })

//       app.listen(process.env.PORT,(err)=>{
//         console.log("listensing")
//       })

//   }
//   catch(err){
//     console.log(err);
//   }

// })()