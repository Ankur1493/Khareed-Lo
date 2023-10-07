import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({step1,step2,step3,step4}) => {
  return (
    <div className='nav'>

        <div className="navbar flex justify-center">
            {
                step1 ?(

                    <div className="item mx-4">
                        <Link to={"/login"} className='text-gray-800 text-[16px]'>
                            Sign In --→
                        </Link>
                    </div>
                    ): (
                        <div className='text-gray-500 cursor-not-allowed text-[13px] mx-8'>Sign In</div>
                    )
            }
            {
                step2 ?(

                    <div className="item mx-4">
                        <Link to={"/shipping"} className='text-gray-800 text-[16px]'>
                            Shipping Screen --→
                        </Link>
                    </div>
                    ): (
                        <div className='text-gray-500 cursor-not-allowed text-[13px] mx-8'>Shipping Screen</div>
                    )
            }
            {
                step3 ?(

                    <div className="item mx-4">
                        <Link to={"/payment"} className='text-gray-800 text-[16px]'>
                            Payment Method --→
                        </Link>
                    </div>
                    ): (
                        <div className='text-gray-500 cursor-not-allowed text-[13px] mx-8'>Payment Method</div>
                    )
            }
            {
                step4 ?(

                    <div className="item mx-4">
                        <Link to={"/place_order"} className='text-gray-800 text-[16px]'>
                            Place Order
                        </Link>
                    </div>
                    ): (
                        <div  className='text-gray-500 cursor-not-allowed text-[13px] mx-8'>Place Order</div>
                    )
            }
        </div>

        
    </div>
  )
}

export default CheckoutSteps