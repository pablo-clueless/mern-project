import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useStateContext } from './contexts/ContextProvider'
import {Home, Signup, Login, Profile, PasswordReset, EditUser } from './pages'
import { Navbar, Notifications, UserMenu } from './components'
import { retrieveFromLocalStorage } from './libs'

const App = () => {
  const { currentMode, setMode, isClicked } = useStateContext()
  const { isLoggedIn } = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const mode = retrieveFromLocalStorage('mode')
    setMode(mode)
  },[])

  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate('/signin')
  },[])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='bg-slate-200 dark:bg-slate-700 relative'>
        <div className='w-full absolute top-0 left-0 bg-white dark:bg-gray-600 navbar'>
          <Navbar />
        </div>
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/user/:username' element={<Profile />} />
            <Route path='/user/edit' element={<EditUser />} />
            <Route path='/reset-password' element={<PasswordReset />} />
          </Routes>
        </Suspense>

        {isClicked.notifications && <Notifications />}
        {isClicked.profile && <UserMenu />}
      </div>
    </div>
  )
}

export default App