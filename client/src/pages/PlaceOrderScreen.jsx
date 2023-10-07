import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart);
    const {cartItems,shippingAddress} = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (item)=>{
        dispatch(removeFromCart(item))
    }

    useEffect(()=>{
        if(cartItems.length === 0){
            navigate("/")
        }
    })

  return (
    <div className='flex py-16'>
        <div className="image fixed w-[45vw]">
        <img src="/thanks.webp" alt="" />
        </div>
        <div className="summary ml-[45vw] w-[53vw] mt-5 mb-16">
            <CheckoutSteps step1 step2 step3 step4/>
            <div>
                <h1 className='text-center text-3xl mb-2'>Order Summary</h1>
                <div className="cartItems">
                    <ul className='flex flex-col items-center'>
                        {cartItems.map((item)=>(
                            <li key={item._id} className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_10px]  flex justify-between px-4 h-20 rounded-lg my-4 w-[80%]'>
                                <div className="productImage my-auto w-[17%]">
                                <Link to = {`/products/${item._id}`}>
                                    <img src={item.image} className='rounded-lg' alt="product image" />
                                </Link>
                                </div>
                                <div className="info flex justify-around w-[80%]">
                                    <div>
                                        <div className="name text-gray-800 text-2xl">{item.name}</div>
                                        <div className='flex justify-around my-2'>
                                            <div className="qty mr-3">qty: {item.qty}</div>
                                            <div className="price">Product Price: {item.price}</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                    <div className="totalPrice"><span className='text-gray-800 text-[18px]'>Total Price:</span> {item.qty * item.price}</div>
                                    <div className="remove my-3 text-blue-600 text-[16px] cursor-pointer" onClick={()=>{handleRemove(item)}}>Remove Item</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>

            <div className="paySection text-left w-[55vw] flex justify-between fixed bottom-0 z-10 h-32 bg-slate-100  text-gray-800 border-t-4 border-gray-800">
                <div className='ml-8'>
                <div className="shippingAddress text-[14px] mt-3">Shipping Address:- 
                <span>
                <p>{shippingAddress.address}, </p>
                {shippingAddress.city}, 
                {shippingAddress.postalCode}
                </span>
                </div>
                <div className="checkout text-[20px] mt-3">
                    Total Price:- 
                    <span className='text-2xl'>{cart.totalPrice}</span>
                </div>
                </div>
                <div className="paymentButton mr-24 h-100 m-auto">
                    <button className='w-52 border duration-400 text-2xl font-bold rounded border-gray-800 h-16 hover:bg-gray-800 hover:text-white'>Pay Now</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PlaceOrderScreen