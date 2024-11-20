import React from 'react'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'
import {Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
    
    </>
  )
}

export default App
