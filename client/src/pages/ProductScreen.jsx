import React from 'react'
import { useGetProductDetailsQuery } from '../slices/productSlice'
import { useParams } from 'react-router'

const ProductScreen = () => {

  const {id: product_id} = useParams();

  const {data,isLoading,error} = useGetProductDetailsQuery(product_id)

  const product = data?.product; 

  return (
    <div>
      {
        isLoading ? 
       ( <h2>Loading</h2>):
        error?
       ( <h2>error</h2>):
        (
          <div>
            <h2>
              {product.name}
            </h2>
          </div>
        )
      }
    </div>
  )
}

export default ProductScreen