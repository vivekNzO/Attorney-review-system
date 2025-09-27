import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center h-[84px] w-full px-20 py-10 bg-linear-to-r from-[#0E121A] to-[#2D2D2F] shadow-lg text-white'>
        <div className='text-3xl' onClick={()=>navigate("/")}>
            Attorney Review
        </div>
        <div>
            <button className='hover:underline cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar