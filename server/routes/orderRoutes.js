import express  from "express";

const router = express.Router();
import { getUserOrders, addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getAllOrders  } from "../controllers/orderControllers.js";
import {authenticate, admin} from "../middlewares/authenticate.js"


router.route("/")
    .post(authenticate,addOrderItems)
    .get(authenticate, admin,  getAllOrders);

router.route("/my_orders")
    .get(authenticate,getUserOrders);

router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, updateOrderToPaid);
router.route("/:id/deliver").put(authenticate, admin, updateOrderToDelivered);


export  {router as orderRouter};