import React from 'react'

const Toast = ({type, message, onClose}) => {
  if(type === 'error') {
    return (
      <div className='w-200'></div>
    )
  }
  
  return (
    <div>Toast</div>
  )
}

export default Toast