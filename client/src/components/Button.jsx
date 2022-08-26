import React from 'react'

const Button = ({type, label, icon, onClick, variant, disabled}) => {

    if(variant === 'outlined') {
        return (
            <button id='button' type={type} onClick={onClick} className='flex items-center gap-2 px-4 py-2 my-2 border-thin border-primary bg-white text-primary hover:bg-primary hover:text-white transition-all duration-500 disabled:bg-gray-400 disabled:text-black disabled:border-gray-400 disabled:cursor-not-allowed' disabled={disabled}>
                {label} {icon}                
            </button>
        )
    }

  return (
    <button id='button' type={type} onClick={onClick} className='flex items-center gap-2 px-4 py-2 my-2 border-thin bg-primary text-white hover:bg-white hover:text-primary hover:border-primary transition-all duration-500 disabled:bg-gray-400 disabled:text-black disabled:border-gray-400 disabled:cursor-not-allowed' disabled={disabled}>
        {label} {icon}        
    </button>
  )
}

export default Button