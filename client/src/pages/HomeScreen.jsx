import React from 'react';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div className='home items-center justify-items-center grid grid-cols-4 w-full min-h-screen bg-slate-900'>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>Error</h2>
      ) : (
        data.products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default HomeScreen;
