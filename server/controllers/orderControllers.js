import Order from "../models/orderModel.js";

export const addOrderItems = async(req,res)=>{

    const { orderItems, shippingAddress, paymentMethod, paymentResult, totalPrice } = req.body;

    try{

        if(orderItems && orderItems.length === 0){
            throw new Error("No order items");
        }
        const order = new Order({
            orderItems: orderItems.map(x=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            totalPrice
        })
        const createOrder = await order.save();

        return res.status(200).json({
            status: "success",
            createOrder
        })
    }catch(err){
        return res.status(401).json({
            status: "failed",
            error: err.message
        })
    }
}
export const getUserOrders = async(req,res)=>{
    try{
        const user = req.user;

        const userOrders = await Order.find({user: user._id});

        if(!userOrders){
            throw new Error("No Orders found")
        }
        return res.status(200).json({
            status: "success",
            userOrders
        })
    }catch(err){
        return res.status(400).json({
            status: failed,
            error: err.message
        })
    }
}
export const getOrderById = async(req,res)=>{

       try{

        const orderId = req.params.id;

        const order = await Order.findById(orderId).populate("user", "name email");

        if(!order){
            throw new Error("no order found")
        }

        return res.status(200).json({
            status: "success",
            order
        })
    }catch(err){
        return res.status(400).json({
            status: failed,
            error: err.message
        })
    }
}
export const updateOrderToPaid = async(req,res)=>{
    res.status(200).json({
        status: "success"
    })
}
export const updateOrderToDelivered = async(req,res)=>{
    res.status(200).json({
        status: "success"
    })
}
export const getAllOrders = async(req,res)=>{
    res.status(200).json({
        status: "success"
    })
}
