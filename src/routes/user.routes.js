import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


export const router=Router();
import multer from "multer";
const upload = multer({ dest: "public/temp" });
router.post("/register",upload.fields(
  [
    {
      name:"avatar",
      maxCount:1
    },
    {
      name:"coverImage",
      maxCount:1
    }
  ]
),registerUser)
router.get("/",registerUser)


