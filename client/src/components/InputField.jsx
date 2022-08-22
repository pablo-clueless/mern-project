import React from 'react'

const InputField = ({label, type, name, onChange, placeholder, error}) => {
  return (
    <div className='w-full md:w-400 my-3'>
        <label htmlFor={name} className='text-sm text-primary'>{label}</label>
        <div className={`w-full h-11 border-1 px-4 py-2 ${error ? 'border-red-500 text-red-500' : 'border-primary text-primary'}`}>
            <input type={type} name={name} onChange={onChange} placeholder={placeholder} className='w-full h-full bg-transparent outline-none placeholder:italic' />
        </div>
        <div className='w-full h-4'>
          {error && <p className='text-xs text-red-500'>{error}</p>}
        </div>
    </div>
  )
}

export default InputField