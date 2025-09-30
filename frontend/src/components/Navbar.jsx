import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {authUser} = useContext(AuthContext)
  const {logout} = useContext(AuthContext)
  return (
    <div className='flex justify-between items-center h-[84px] w-full px-20 py-10 bg-linear-to-r from-[#0E121A] to-[#2D2D2F] shadow-lg text-white'>
        <div className='text-3xl' onClick={()=>navigate("/")}>
            Attorney Review
        </div>
        <div className='flex justify-around gap-10 '>

        {authUser?.role==='Attorney' && 
        <button>Your Clients</button>
        }

        {/* Browse clients */}
        {authUser && 
        <button className='cursor-pointer hover:underline'
        onClick={()=>navigate("/browse-clients")}
        >
          {authUser.role==='Attorney'? "Add-client":"Browse-clients"}
        </button>
        }
        {/* pending requests */}

        {authUser?.role==='Admin' && 
        <button className='cursor-pointer hover:underline'
        onClick={()=>navigate("/pending-requests")}
         >
          Pending Requests
        </button>
         }

        {!authUser?  <button className='hover:underline cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</button> : 
        <button className='hover:underline cursor-pointer' onClick={logout}>Log Out</button>}
           
        </div>
    </div>
  )
}

export default Navbar