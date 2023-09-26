import React from 'react'
import Navbar from '../components/Navbar'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <div className='home items-center justify-items-center grid grid-cols-4 w-full min-h-screen bg-slate-900'>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
    </div>
  )
}

export default HomeScreen