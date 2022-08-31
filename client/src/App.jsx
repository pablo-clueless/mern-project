import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Chat, ForgotPassword, Home, Login, PasswordReset, Post, PrivacyPolicy, Profile, Settings, Signup } from './pages'
import { CookieCard, Fallback, Navbar, Notifications } from './components'
import { useStateContext } from './contexts/ContextProvider'
import { getAllPosts } from './store/features/postSlice'
import { login } from './store/features/authSlice'
import { retrieveFromLocalStorage } from './libs'

const url = import.meta.env.VITE_URL

const App = () => {
  const { currentMode, setMode, isClicked } = useStateContext()
  const dispatch = useDispatch()

  useEffect(() => {
    const mode = retrieveFromLocalStorage('mode')
    setMode(mode)
  },[])

  useEffect(() => {
    const user = retrieveFromLocalStorage('user')
    if(user === null) return
    dispatch(login(user))
  },[])

  useEffect(() => {
    dispatch(getAllPosts())
  },[])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='w-screen h-screen flex flex-col items-center relative bg-gray-200'>
        <Navbar />
          <div className='h-full'>
            <Suspense fallback={<Fallback />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Login />} />
                <Route path='/user/:id' element={<Profile />} />
                <Route path='/posts/:id' element={<Post />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<PasswordReset />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              </Routes>
            </Suspense>
          </div>
        {isClicked.notifications && <Notifications />}
      </div>
    </div>
  )
}

export default App