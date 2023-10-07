import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

const PaymentScreen = () => {

  const navigate = useNavigate();
  const cart = useSelector(state=> state.cart);
  const userStatus = useSelector(state=> state.auth.userInfo);
  const shippingStatus = cart.shippingAddress? true: false;
  

  useEffect(()=>{
    if(!shippingStatus){
      navigate("/shipping")
    }else if(!userStatus){
      navigate("/login")
    }
  },[])

  const handleSubmit = ()=>{
    navigate('/place_order')
  }

  return (
    <div className='h-[80vh] w-screen flex flex-col items-center justify-center'>
      <div>
        PaymentScreen
      </div>
      <div className="next mt-8">
          <button onClick={handleSubmit} className='px-4 border rounded-lg hover:bg-gray-800 hover:text-white duration-300 border-gray-800 h-7 w-64'>Place Order</button>
      </div>

    </div>
  )
}

export default PaymentScreen