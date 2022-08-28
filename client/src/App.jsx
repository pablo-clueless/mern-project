import React, { Suspense, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { FiPlus } from 'react-icons/fi'

import {  Home, Login, PasswordReset, Post, PrivacyPolicy, Profile, Settings, Signup } from './pages'
import { CookieCard, Fallback, Navbar, PostForm, Sidebar, Widget } from './components'
import { useStateContext } from './contexts/ContextProvider'
import { SocketContext } from './contexts/SocketProvider'
import { getAllPosts } from './store/features/postSlice'
import { retrieveFromLocalStorage } from './libs'

const url = import.meta.env.VITE_URL

const App = () => {
  const { currentMode, setMode, activeMenu, isClicked, handleClick } = useStateContext()
  const { isLoggedIn } = useSelector(store => store.auth)
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const token = cookies.get('token')
  const id = cookies.get('devUserId')

  // const persistSignin = async() => {
  //   if(token && id) {
  //     const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
  //     const res = await fetch(`${url}/signin/auto`, {
  //       method: 'POST',
  //       body: JSON.stringify({id}),
  //       headers })
  //     const data = await res.json()
  //     console.log(data)
  //   }
  // }
  
  // useEffect(() => {
  //   persistSignin()
  // },[])

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
        {!isLoggedIn && <Widget icon={<FiPlus/>} onClick={() => handleClick('new_post')} />}
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
        {isClicked.new_post && <PostForm />}
      </div>
    </div>
  )
}

export default App