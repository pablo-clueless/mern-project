import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiBell, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import dev_logo from '../assets/images/logo.svg'

const Navbar = () => {
  const { activeMenu, setActiveMenu, currentMode, setMode, screenSize, setScreenSize } = useStateContext()
  const { user, isLoggedIn } = useSelector(store => store.auth)

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleScreenResize)
    handleScreenResize()
    return () => window.removeEventListener('resize', handleScreenResize)
  },[])

  useEffect(() => {
    screenSize > 768 && setActiveMenu(false)
  },[screenSize])

  return (
    <div className='w-full flex items-center justify-between p-4'>
      <Link to='/'>
        <img src={dev_logo} alt='logo' className='w-100' />
      </Link>

      <div className='flex items-center gap-2'>
        {currentMode === 'Light' ? (
          <IconButton icon={<FiMoon/>} onClick={() => setMode('Dark')} />
        ) : (
          <IconButton icon={<FiSun/>} onClick={() => setMode('Light')} />
        )}
        <div>
          {isLoggedIn && (
            <div className='flex items-center gap-2'>
              <IconButton icon={<FiBell/>} />
            </div>
          )}
        </div>
        <div className='block md:hidden'>
          {activeMenu ?(
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

// TODO: implement user button with image
// const User = () => {}

export default Navbar