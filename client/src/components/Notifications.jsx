import React from 'react'
import { FiX } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'

const Notifications = () => {
  const { handleUnclick } = useStateContext()

  return (
    <div className='nav-item w-250 h-300 fixed right-5 md:right-20 top-16 bg-white dark:bg-slate-500 px-1 py-2 border-thin border-slate-400 rounded-md'>
      <div className='w-full flex justify-between items-center'>
        <p className='dark:text-white text-slate-500'>Notifications</p>
        <button type='button' onClick={() => handleUnclick('notifications')} className='text-xl text-slate-500 dark:text-white rounded-full p-3'>
          <FiX />
        </button>
      </div>
      <div className='w-full h-200 border-t-thin border-slate-400 overflow-y-scroll'></div>
    </div>
  )
}

export default Notifications