import React from 'react'

const Button = ({type, label, onClick, variant, disabled}) => {

    if(variant === 'outlined') {
        return (
            <button id='button' type={type} onClick={onClick} className='px-4 py-2 my-2 border-thin border-primary bg-white text-primary' disabled={disabled}>
                {label}
            </button>
        )
    }

  return (
    <button id='button' type={type} onClick={onClick} className='px-4 py-2 my-2 border-thin bg-primary text-white' disabled={disabled}>
        {label}
    </button>
  )
}

export default Button