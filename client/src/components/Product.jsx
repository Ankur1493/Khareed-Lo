import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <div className='w-[250px] h-72 rounded-lg bg-red-50'>
        <Link to={`products/${product._id}`}>
        <div className="titleImage">
            <img src={product?.image} alt="" />
        </div>
        <div className="content">{product?.name}</div>
        </Link>
    </div>
  )
}

export default Product