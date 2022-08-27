import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {  Home, Login, PasswordReset, Post, PrivacyPolicy, Profile, Settings, Signup } from './pages'
import { useStateContext } from './contexts/ContextProvider'
import { SocketContext } from './contexts/SocketProvider'
import { getAllPosts } from './store/features/postSlice'
import { retrieveFromLocalStorage } from './libs'
import { CookieCard, Fallback, Navbar, Sidebar } from './components'

const App = () => {
  const { currentMode, setMode, activeMenu, isClicked } = useStateContext()
  const { isLoggedIn } = useSelector(store => store.auth)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const mode = retrieveFromLocalStorage('mode')
    setMode(mode)
  },[])

  useEffect(() => {
    dispatch(getAllPosts())
  },[])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='bg-white dark:bg-slate-700 relative'>
        <div className='w-full fixed md:static top-0 left-0 navbar'>
          <Navbar />
        </div>
        <div className={`absolute top-0  bg-white dark:bg-slate-700 sidebar-mobile ${activeMenu ? 'left-0' : '-left-full'} transition-all duration-300`}>
          <Sidebar />
        </div>
        {/* <CookieCard /> */}
        <div>
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Login />} />
              <Route path='/user/:id' element={<Profile />} />
              <Route path='/reset-password' element={<PasswordReset />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default App