import React from 'react';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div className='py-16'>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen w-[98vw]'>
          <Loader/>
        </div>
      ) : error ? (
        <div className='flex justify-center items-center h-screen w-[98vw]'>
          <Message error={error}/>
        </div>
      ) : (
        <div className='home items-center justify-center justify-items-center grid grid-cols-4 gap-y-16 w-[98vw] h-screen mb-16'>

        {data.products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
