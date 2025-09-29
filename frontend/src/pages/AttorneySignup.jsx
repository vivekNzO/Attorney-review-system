import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/AuthContext'

const AttorneySignup = () => {
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    roleName:"Attorney",
    licenseNumber:""
  })

  const navigate = useNavigate()
  const {signup} = useContext(AuthContext)

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await signup(formData)
    if(res.success)navigate("/wait-for-approval")
  }
  return (
    <div className='min-h-[calc(100vh-84px)] flex'>
    {/* Left side form */}
    <div className='flex flex-col items-center justify-center w-full md:w-1/2 bg-white px-10 lg:px-20'>
      <div className='w-full max-w-md'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Create an account</h1>
      <p className='text-gray-500 mb-6 text-center'>Connect with clients who need your guidance.</p>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          required
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        </div>
        <div>
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={formData.lastName}
          required
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        </div>
        <div>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          required
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        </div>
        <div>
        <input
          type='text'
          name='licenseNumber'
          placeholder='License Number'
          value={formData.licenseNumber}
          required
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        </div>
        <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          required
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50'
        />
        </div>
        <button className='w-full bg-black/80 text-white py-2 font-semibold hover:bg-black rounded-xl transition-colors'>Sign up</button>
      </form>
      <div className='text-center mt-6'>
        <span>Already have an acount? </span><span onClick={()=>navigate("/login")} className='text-red-500 hover:underline cursor-pointer'>Log in</span>
      </div>
      </div>
    </div>
    {/* Right side illustration */}
    <div className='hidden md:flex w-1/2 items-center justify-center p-10'>
    <div className='text-center px-2'>
      <img
        src='/law3.jpg'
        className='mx-auto'
      />
      <h1 className='text-2xl font-semibold mt-6'>
        Showcase Your Legal Expertise.
      </h1>
      <p className='text-gray-600 mt-2'>Expand your professional reach and showcase your strengths to clients actively searching for trusted legal advisors.</p>
    </div>
    </div>
    </div>
  )
}

export default AttorneySignup