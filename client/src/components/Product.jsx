import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <div className='w-[250px] h-72 rounded-lg bg-red-50'>
        <Link to={"/product/123"}>
        <div className="titleImage">
            <img src="" alt="image" />
        </div>
        <div className="content">Bolo tararararara</div>
        </Link>
    </div>
  )
}

export default Product