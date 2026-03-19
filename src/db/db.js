import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv"

dotenv.config()

export const dbconnect=async()=>{
    try{
         const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
         console.log(connectioninstance);
         
    }
    catch(err){
      console.log("mongodb connection error",err);
      process.exit(1);
      
    }



    
}