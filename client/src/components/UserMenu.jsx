import React from 'react'
import { useSelector } from 'react-redux'
import { FiX } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'

const UserMenu = () => {
  const { handleUnclick } = useStateContext()
  const { user } = useSelector(store => store.auth)
  const { existingUser } = user
  
  return (
    <div className='nav-item w-250 h-300 absolute right-5 md:right-20 top-16 bg-white dark:bg-slate-500 px-1 py-2 border-thin border-slate-400 rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <p className='dark:text-white text-slate-500'>User</p>
        <button type='button' onClick={() => handleUnclick('profile')} className='text-xl text-slate-500 dark:text-white rounded-full p-3'>
          <FiX />
        </button>
      </div>
      <div className='w-full h-200 flex flex-col items-center border-t-thin border-slate-400'></div>
    </div>
  )
}

export default UserMenu