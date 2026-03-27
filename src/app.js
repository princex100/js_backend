import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app=express();

app.use(cors())
app.use(cookieParser())
app.use(urlencoded())
app.use(express.json())
app.use(express.static("public"))

import {router as userrouter} from "./routes/user.routes.js"

app.use("/api/v1/users",userrouter);
