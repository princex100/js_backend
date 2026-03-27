import { Router } from "express";
import { app } from "../app";
import { registerUser } from "../controllers/user.controller";


export const router=Router();

router.get("/register",registerUser)


