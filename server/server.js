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
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the actual URL of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies across origins
  };
  

app.use(cors(corsOptions));
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
