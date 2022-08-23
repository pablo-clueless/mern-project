import React from 'react'
import { FiX } from 'react-icons/fi'

const Toast = ({type, message, onClose}) => {
  if(type === 'error') {
    return (
      <div className='w-auto flex items-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 bg-red-200 border-thin border-red-600 text-red-600 px-2 py-4 toast'>
        <p>{message}</p>
        <button onClick={onClose} className='rounded-full p-2 hover:drop-shadow-xl'>
          <FiX />
        </button>
      </div>
    )
  }
  
  if(type === 'success') {
    return (
      <div className='w-auto flex items-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 bg-green-200 border-thin border-green-600 text-green-600 px-2 py-4 toast'>
        <p>{message}</p>
        <button onClick={onClose} className='rounded-full p-2 hover:drop-shadow-xl'>
          <FiX />
        </button>
      </div>
    )
  }
  
  if(type === 'warning') {
    return (
      <div className='w-auto flex items-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 bg-amber-200 border-thin border-amber-600 text-amber-600 px-2 py-4 toast'>
        <p>{message}</p>
        <button onClick={onClose} className='rounded-full p-2 hover:drop-shadow-xl'>
          <FiX />
        </button>
      </div>
    )
  }
  
  return (
    <div className='w-auto flex items-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 bg-blue-200 border-thin border-blue-600 text-blue-600 px-2 py-4 toast'>
      <p>{message}</p>
      <button onClick={onClose} className='rounded-full p-2 hover:drop-shadow-xl'>
        <FiX />
      </button>
    </div>
  )
}

export default Toast