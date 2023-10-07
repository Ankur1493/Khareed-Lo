import express  from "express";

const router = express.Router();
import { getUserOrders, addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders  } from "../controllers/orderControllers.js";
import {authenticate, admin} from "../middlewares/authenticate.js"


router.route("/")
    .post(authenticate,addOrderItems)
    .get(authenticate, admin,  getAllOrders);

router.route("/my_orders")
    .get(authenticate,getUserOrders);

router.route("/:id").get(authenticate, admin, getOrderById);
router.route("/:id/pay").get(authenticate, admin, updateOrderToPaid);
router.route("/:id/deliver").get(authenticate, admin, updateOrderToDelivered);


export  {router as orderRouter};