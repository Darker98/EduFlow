import React from 'react'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import {Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    
    </>
  )
}

export default App
