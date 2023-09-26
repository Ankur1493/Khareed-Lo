import React from 'react'

const Navbar = () => {
  return (
    <div className='pl-[20px] pr-[20px] h-[45px] w-full bg-slate-800 flex justify-between'>
        <div>Khareed Lo</div>
        <div className='flex w-[400px] justify-around bg-red-200'>
            <div className="search">Search</div>
            <div className="auth">Authentication</div>
        </div>
    </div>
  )
}

export default Navbar