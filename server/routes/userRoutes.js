import express from "express";
import { getAllUser, createNewUser,userLogin, userLogout, getUserProfile, updateUserProfile } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUser);

//register and auth
router.post("/", createNewUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.get("/profile",getUserProfile);
router.patch("/profile",updateUserProfile);



export {router as userRouter};