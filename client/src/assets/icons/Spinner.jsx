import React from 'react'

import './icons.css'

const Spinner = () => {
  return (
    <svg className='spinner' role='alert' aria-live='assertive'>
        <circle className='spinner__path' cx='10' cy='10' r='8' fill='none' strokeWidth='2' strokeMiterlimit='10' />
    </svg>
  )
}

export default Spinner