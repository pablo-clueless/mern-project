import React, { useEffect } from 'react'

import { useStateContext } from '../contexts/ContextProvider'

const Navbar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } = useStateContext()

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleScreenResize)
    handleScreenResize()
    return () => window.removeEventListener('resize', handleScreenResize)
  },[])

  return (
    <div>Navbar</div>
  )
}

export default Navbar