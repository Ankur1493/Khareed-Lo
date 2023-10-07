import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./routes/productRoutes.js";
import  {userRouter}  from "./routes/userRoutes.js";
import  {orderRouter}  from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);


mongoose.connect(process.env.URI)
    .then(()=>{
        const port = process.env.PORT;
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
    }).catch((err)=>{
        console.log(err);
    })
