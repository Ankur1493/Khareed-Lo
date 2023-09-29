import React from 'react'
import { useGetProductDetailsQuery } from '../slices/productSlice'
import { useParams } from 'react-router'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {

  const dispatch = useDispatch();

  const {id: product_id} = useParams();

  const {data,isLoading,error} = useGetProductDetailsQuery(product_id)

  const product = data?.product; 

  const handleAddToCart = ()=>{
    console.log(product);
    dispatch(addToCart({...product}))

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
            <div className="desc w-[85%] text-[16px]">
              <div>{product?.description}</div>
            </div>
           <div className='mt-8'>
            <button onClick={handleAddToCart} className ="py-2 px-4 w-[450px] text-[22px] bg-transparent text-red-600 font-semibold border border-gray-800 rounded-2xl hover:bg-gray-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              Add to Cart
            </button>
           </div>
           </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductScreen