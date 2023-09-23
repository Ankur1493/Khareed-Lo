import express from "express";
import { getProducts, getProductById, createProduct, deleteProduct,updateProduct } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js"

const router = express.Router();

router.route("/")
    .get(getProducts)
    .post(upload.single("image"),createProduct)

router.route("/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .patch(updateProduct)


export {router as productRouter}