import express from "express";
import { getAllUser, createNewUser,userLogin, userLogout, getUserProfile, updateUserProfile } from "../controllers/userControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", getAllUser);

//register and auth
router.post("/", createNewUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.get("/profile",authenticate, getUserProfile);
router.put("/profile",authenticate,updateUserProfile);



export {router as userRouter};