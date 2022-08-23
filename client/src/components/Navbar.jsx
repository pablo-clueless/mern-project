import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiBell, FiBook, FiMenu, FiMoon, FiSun, FiUser, FiX } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import { Searchbar } from './'

const Navbar = () => {
  const { currentMode, setMode, activeMenu, setActiveMenu, handleClick } = useStateContext()
  const { user, isLoggedIn } = useSelector(store => store.auth)

  return (
    <div className='w-full flex items-center justify-between px-4 py-3 border-b-thin border-slate-400'>
      <div>
        <Link to='/' className='text-3xl font-bold font-aboreto flex items-center'>
          <FiBook /> LOGO
        </Link>
      </div>

      <Searchbar />
      
      <div className='flex items-center'>
        {currentMode === 'Dark' ? (
          <div onClick={() => setMode('Light')} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
            <FiSun />
          </div>
        ) : (
          <div onClick={() => setMode('Dark')} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
            <FiMoon />
          </div>
        )}
        {isLoggedIn && (
          <div className='hidden md:flex items-center'>
            <div onClick={() => handleClick('notifications')} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl relative'>
              <FiBell />
              <div className='w-2 h-2 bg-blue-600 rounded-full absolute top-4 right-4'></div>
            </div>
            <div onClick={() => handleClick('profile')} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
              <FiUser />
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <div onClick={() => handleClick('profile')} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
            <FiUser />
          </div>
        )}
        <div className='block md:hidden'>
          {activeMenu ? (
            <div onClick={() => setActiveMenu(prev => !prev)} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
            <FiX />
          </div>
            ) : (
            <div onClick={() => setActiveMenu(prev => !prev)} className='rounded-full p-4 text-xl text-secondary cursor-pointer hover:drop-shadow-xl'>
              <FiMenu />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar