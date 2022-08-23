import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiGithub, FiGlobe, FiLinkedin, FiLogOut, FiTwitter, FiX } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { useStateContext } from '../contexts/ContextProvider'
import { logout} from '../store/features/authSlice'
import { useHttpRequest } from '../hooks'
import { Modal, Toast } from './'
import { DUMMY_USER } from '../dummy-user'

const url = import.meta.env.VITE_URL

const UserMenu = () => {
  const { handleUnclick } = useStateContext()
  const { user, isLoggedIn } = useSelector(store => store.auth)
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const token = cookies.get('token')

  const goToSignin = () => {
    handleUnclick('profile')
    navigate('/signin')
  }

  const handleSignOut = async(e) => {
    e.preventDefault()

    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    await sendRequest(`${url}/auth/signout`,'POST', null, headers)
    setOpenModal(false)
    handleUnclick('profile')
    dispatch(logout())
    navigate('/signin')
  }
  
  return (
    <>
    {error && <Toast type='error' message={error} onClose={clearError} />}
    {openModal && <Modal message='Are you sure you want to logout?' onClose={() => setOpenModal(false)} onConfirm={handleSignOut} />}
    {loading && <h1 className='backdrop'>Loading</h1>}
    <div className='nav-item w-250 h-300 fixed right-5 md:right-10 top-16 bg-white dark:bg-slate-500 px-1 py-2 border-thin border-slate-400 rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <p className='dark:text-white text-slate-500'>Profile</p>
        <button type='button' onClick={() => handleUnclick('profile')} className='text-xl text-slate-500 dark:text-white rounded-full p-3'>
          <FiX />
        </button>
      </div>
      <div className='w-full h-200 flex flex-col items-center border-t-thin border-slate-400'>
        {!isLoggedIn && (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <p className='text-lg'>
              You're not logged in.
            </p>
            <div onClick={goToSignin} className=' bg-slate-400 px-4 py-2 my-4 cursor-pointer'>
              Signin
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div className='w-full h-full flex flex-col'>
            <div className='w-full flex items-center justify-between p-2'>
              <div className='rounded-full h-16 w-16'>
                <img src={DUMMY_USER.image} alt={DUMMY_USER.username} className='w-full h-full rounded-full object-cover' />
              </div>
              <div>
                <p className='font-semibold text-lg text-primary'>{DUMMY_USER.fullName}</p>
                <p className='font-light text-sm text-slate-500'>@{DUMMY_USER.username}</p>
              </div>
            </div>
            <div className='w-full flex items-center justify-center gap-4 my-2'>
              <a href={DUMMY_USER.url} target='_blank' rel='noopener noreferrer' className='rounded-full text-slate-500'>
                <FiGlobe />
              </a>
              <a href={DUMMY_USER.github} target='_blank' rel='noopener noreferrer' className='rounded-full text-slate-500'>
                <FiGithub />
              </a>
              <a href={DUMMY_USER.linkedin} target='_blank' rel='noopener noreferrer' className='rounded-full text-slate-500'>
                <FiLinkedin />
              </a>
              <a href={DUMMY_USER.twitter} target='_blank' rel='noopener noreferrer' className='rounded-full text-slate-500'>
                <FiTwitter />
              </a>
            </div>
            <div className='w-full flex flex-col px-5 mt-4 gap-2'>
              <Link className='text-slate-500 hover:text-primary hover:font-medium' to={`/user/${DUMMY_USER.username}`}>
                Profile
              </Link>
              <Link className='text-slate-500 hover:text-primary hover:font-medium' to={`/settings`}>
                Settings
              </Link>
            </div>
            <div className='flex self-end mt-2'>
              <FiLogOut className='text-xl text-slate-500 cursor-pointer' onClick={() => setOpenModal(true)} />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default UserMenu