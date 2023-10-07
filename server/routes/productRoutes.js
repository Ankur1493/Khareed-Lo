import express from "express";
import { getProducts, getProductById, createProduct, deleteProduct,updateProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js"
import { admin, authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.route("/")
    .get(getProducts)
    .post(authenticate, admin, upload.single("image"),createProduct)

router.route("/:id")
    .get(getProductById)
    .delete(authenticate,admin,deleteProduct)
    .patch(authenticate,admin, updateProduct)


export {router as productRouter}