import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Home, Signup, Login, Profile, PasswordReset, EditUser, PostById } from './pages'
import { useStateContext } from './contexts/ContextProvider'
import { getAllPosts } from './store/features/postSlice'
import { retrieveFromLocalStorage } from './libs'
import { Fallback } from './components'

const App = () => {
  const { currentMode, setMode, isClicked } = useStateContext()
  const { isLoggedIn } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const mode = retrieveFromLocalStorage('mode')
    setMode(mode)
  },[])

  useEffect(() => {
    dispatch(getAllPosts())
  },[])

  // TODO: implement login persistency

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='bg-slate-50 dark:bg-slate-700 relative'>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/user/:id' element={<Profile />} />
            <Route path='/user/edit' element={<EditUser />} />
            <Route path='/reset-password' element={<PasswordReset />} />
            <Route path='/posts/:id' element={<PostById />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App