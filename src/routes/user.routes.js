import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


export const router=Router();

router.post("/register",registerUser)
router.get("/",registerUser)


