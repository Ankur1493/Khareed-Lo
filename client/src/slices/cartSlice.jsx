import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/updateCart";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") ): {cartItems: []} 

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const item = action.payload;

            const existItem = state.cartItems.find((elem)=> elem._id === item._id);

            if(existItem){
                state.cartItems = state.cartItems.map((elem)=>(
                    (elem._id === existItem._id)? item: elem
                ))
            }else{
                state.cartItems.push(item)
            }

            updateCart(state);
        },
        removeFromCart: (state,action)=>{
            const item = action.payload;

            state.cartItems = state.cartItems.filter((cartItem)=> cartItem._id !== item._id)
            updateCart(state);
        },
        resetCart: (state) => (state = initialState)

    }
})

export const {addToCart,removeFromCart, resetCart} =  cartSlice.actions 
export default cartSlice.reducer 