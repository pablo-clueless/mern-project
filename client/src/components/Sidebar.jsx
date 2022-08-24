import React from 'react'

import { useStateContext } from '../contexts/ContextProvider'

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext()

  const handleCloseSidebar = () => {
    activeMenu && screenSize < 900 && setActiveMenu(false)
  }

  return (
    <div className='w-full h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto'>

    </div>
  )
}

export default Sidebar