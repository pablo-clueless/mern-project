import React from 'react'
import { FiPlus } from 'react-icons/fi'

const Widget = ({onClick, icon}) => {

  return (
    <div className={`w-12 h-12 grid place-items-center bg-primary text-white rounded-full fixed bottom-8 right-8 cursor-pointer shadow-xl widget`} onClick={onClick}>
        <p className='text-3xl'>
          {icon}
        </p>
    </div>
  )
}

export default Widget