import React from 'react'
import { Link } from 'react-router-dom'
import useTruncateDescription from '../utils/truncateDescription'

const Product = ({product}) => {

  const truncatedDescription = useTruncateDescription(product?.description, 10);

  return (
    <div className='w-[250px] h-72 rounded-lg bg-gray-800'>
        <Link to={`products/${product._id}`}>
          <div class="mx-auto mt-11 w-72 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img class="h-48 w-full object-cover object-center" src={product?.image} alt="Product Image" />
            <div class="p-4">
              <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{product?.name}</h2>
              <p class="mb-2 text-base dark:text-gray-300 text-gray-700">{truncatedDescription}</p>
              <div class="flex items-center">
                <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{product?.price} Rs</p>
                <p class="ml-auto text-base font-medium text-green-500">{product?.brand}</p>
              </div>
            </div>
          </div>
        </Link>
    </div>
  )
}

export default Product