import React, { useEffect, useState } from 'react'
import useUserStatus from '../hooks/useUserStatus'
import { useNavigate } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress?.address  || "" )
    const [city,setCity] = useState(shippingAddress?.city  || "" )
    const [postalCode,setPostalCode] = useState(shippingAddress?.postalCode  || "" )
    const [country,setCountry] = useState(shippingAddress?.country  || "" )

    useEffect(()=>{
    
        if(cart.cartItems.length === 0){
            navigate("/")
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate("/payment")
    }

  return (

    <div className='py-32'>
        <CheckoutSteps step1 step2/>

    <div className='h-[75vh] m-auto  border w-72 flex flex-col my-12'>

        <div className="shipping">
            Enter following details
        </div>

        <div className="address">
            <input className='w-64 my-4 bg-slate-200 border-[2px] border-gray-800 rounded' onChange={e=> setAddress(e.target.value)} type="text" value={address}  placeholder='enter your address' />
        </div>
        <div className="city">
            <input className='w-64 my-4 border-[2px]  border-gray-800 rounded' onChange={e=> setCity(e.target.value)} type="text" value={city} placeholder='enter your city' />
        </div>
        <div className="postal-code">
            <input className='w-64 my-4 border-[2px] active:border-[3px] border-gray-800 rounded' onChange={e=>setPostalCode(e.target.value)} type="text" value={postalCode} placeholder='enter your postal-code' />
        </div>
        <div className="country">
            <input className='w-64 my-4 border-[2px] active:border-[3px] border-gray-800 rounded' value={country} type="text" onChange={e=> setCountry( e.target.value)} placeholder='enter your country' />
        </div>
        <div className="submit">
            <button className='border-[2px] border-gray-800' onClick={e=> handleSubmit(e)}>Select payment method</button>
        </div>

    </div>
    </div>
  )
}

export default ShippingScreen