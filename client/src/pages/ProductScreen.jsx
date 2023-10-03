import React, { useState } from 'react'
import { useGetProductDetailsQuery } from '../slices/productSlice'
import { useParams } from 'react-router'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  
  const {id: product_id} = useParams();
  
  const [qty,setQty] = useState(1);

  const dispatch = useDispatch();

  const {data,isLoading,error} = useGetProductDetailsQuery(product_id)
  
  const product = data?.product; 


  const productStatus = product?.countInStock > 0 ? true : false; 

  const handleAddToCart = ()=>{
    dispatch(addToCart({...product,qty}));
    setQty(1);
  }

  return (
    <div>
      {
        isLoading ? 
       (<div className='flex justify-center items-center h-screen w-[98vw]'>
          <Loader/>
       </div> ):
        error?
       (
        <div className='flex justify-center items-center h-screen w-[98vw]'>
          <Message error={error}/>
        </div> 
       ):
        (
          <div className='flex  mt-5'>
           <div className='w-2/5 h-[84vh] ml-4'>
            <img src={product?.image} alt="Product Image" className='h-full rounded-[10px]'/>
           </div>
           <div className='w-2/4 ml-16 mt-4'>
            <div className="head h-16">
              <div className="heading flex justify-between">
                <h1 className='text-3xl font-semibold'>{product?.name}</h1>
                <h2><span className='text-2xl font-medium text-gray-800'>₹{product?.price}</span></h2>
              </div>
            </div>
            <div className="desc w-[85%] min-h-[150px] text-[16px]">
              <div>{product?.description}</div>
            </div>
           <div className='mt-8'>
            {
              productStatus ? 
              <div>

              <button onClick={handleAddToCart} className ="py-2 px-4 w-[450px] text-[22px] bg-transparent text-red-600 font-semibold border border-gray-800 rounded-2xl hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              Add to Cart
              </button>
              <div className="dropdown dropdown-hover ml-36">
                <label tabIndex={0} className="btn px-4 py-2 text-gray-800 text-[22px] border-gray-800 rounded-2xl hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">{qty === 1 ? "Qty: 1" : `Qty: ${qty}`}</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 h-40 overflow-y-auto">
                {Array.from({ length: product.countInStock }, (_, index) => (
                  <li className='border-red-100 cursor-pointer rounded w-16 text-center border-[0.5px] mx-[0.5px] hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200' 
                  key={index}>
                    <button onClick={()=> setQty(index+1)} >
                      {index + 1}
                    </button>
                    </li>
                ))}
                </ul>
              </div>

              </div>
              
            : <h2 className='text-3xl font-bold text-gray-800'>Out Of Stock</h2>  
          }
           </div>
           </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductScreen