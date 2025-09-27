import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AttorneySignup from './pages/AttorneySignup'

function App() {

  

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/signup' element=<Signup/> />
        <Route path='/login' element=<Login/>/>
        <Route path='/attorney-signup' element=<AttorneySignup/>/>
        <Route path='/' element=<HomePage/>/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App