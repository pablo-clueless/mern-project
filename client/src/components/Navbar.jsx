import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiBell, FiMenu, FiMessageSquare, FiMoon, FiSun, FiX } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import dev_logo from '../assets/images/logo.svg'

const Navbar = () => {
  const { activeMenu, setActiveMenu, currentMode, setMode, screenSize, setScreenSize, handleClick } = useStateContext()
  const { isLoggedIn } = useSelector(store => store.auth)

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleScreenResize)
    handleScreenResize()
    return () => window.removeEventListener('resize', handleScreenResize)
  },[])

  useEffect(() => {
    screenSize <= 900 ? setActiveMenu(false) : setActiveMenu(true)
  },[screenSize])

  return (
    <div className='w-full flex items-center justify-between bg-white dark:bg-slate-700 p-3 border-b-thin border-slate-400'>
      <Link to='/'>
        <img src={dev_logo} alt='logo' className='w-20' />
      </Link>
      <div className='flex items-center gap-2'>
        {currentMode === 'Light' ? (
          <button className='rounded-full p-2 text-xl cursor-pointer' onClick={() => setMode('Dark')}>
            <FiMoon className='text-slate-900 hover:fill-primary hover:text-primary wobble' />
          </button>
        ) : (
          <button className='rounded-full p-2 text-xl cursor-pointer' onClick={() => setMode('Light')}>
            <FiSun className='text-white hover:animate-spin hover:text-amber-300' />
          </button>
        )}
        <div>
          {isLoggedIn && (
            <div className='flex items-center gap-2'>
              <button className='rounded-full p-2 text-xl dark:text-white cursor-pointer ' onClick={() => handleClick('notifications')}>
                <FiBell className='hover:text-primary hover:fill-primary bellshake' />
              </button>
              <Link to='/chat' className='rounded-full p-2 text-xl dark:text-white cursor-pointer'>
                <FiMessageSquare className='hover:text-rose-400 hover:fill-rose-400 vibrate' />
              </Link>
            </div>
          )}
        </div>
        <div className='block md:hidden'>
          {activeMenu ? (
            <IconButton icon={<FiX/>} onClick={() => setActiveMenu(false)} />
          ) : (
            <IconButton icon={<FiMenu/>} onClick={() => setActiveMenu(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

const IconButton = ({icon, onClick}) => {

  return (
    <div className='rounded-full p-2 text-xl dark:text-white cursor-pointer hover:drop-shadow-md' onClick={onClick}>
      {icon}
    </div>
  )
}

export default Navbar