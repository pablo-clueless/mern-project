import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useStateContext } from './contexts/ContextProvider'
import {Home, Signup, Login, Profile, PasswordReset } from './pages'

const App = () => {
  const { currentMode } = useStateContext()

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