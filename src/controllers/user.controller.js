import { app } from "../app";
import { asyncHandler } from "../utils/asyncHandler";

export const registerUser=asyncHandler((req,res,next)=>{
  res.status(200).json({
    message:"success"
  })
})