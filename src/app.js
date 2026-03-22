import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

app.use(cors())
app.use(cookieParser())
app.use(urlencoded())
app.use(express.json())
app.use(express.static("public"))