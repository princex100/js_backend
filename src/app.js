import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fs from "fs"
export const app=express();

app.use(cors())
app.use(cookieParser())
app.use(urlencoded())
app.use(express.json())
app.use(express.static("public"))

import {router as userrouter} from "./routes/user.routes.js"
import { ApiError } from "./utils/ApiError.js";

app.use("/api/v1/users",userrouter);
app.use((err,req,res,next)=>{
  fs.unlinkSync(req.files?.avatar[0]?.path)
  fs.unlinkSync(req.files?.coverImage[0]?.path)
  throw new ApiError(500,err.message);
})
