import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import { useStateContext } from './contexts/ContextProvider'
import {Home, Signup, Login, Profile, PasswordReset } from './pages'
import { login } from './store/features/authSlice'

const App = () => {
  const { currentMode } = useStateContext()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(store => store.auth)
  const cookies = new Cookies()
  const authToken = cookies.get('authToken')

  const autoLogin = () => {
    if(authToken) {
      dispatch(login())
    }
  }

  useEffect(() => {
    autoLogin()
  },[])

  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate('/signin')
  },[])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <Suspense fallback={null}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/user/:username' element={<Profile />} />
          <Route path='/reset-password' element={<PasswordReset />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App