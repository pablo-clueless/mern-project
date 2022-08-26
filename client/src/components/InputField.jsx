import React from 'react'

const InputField = ({label, type, name, onChange, placeholder, error}) => {
  return (
    <div className='w-4/5 bg-transparent'>
        <label htmlFor={name} className='text-sm text-primary'>{label}</label>
        <div className={`w-full h-11 bg-transparent border-thin px-4 py-2 focus-within:border-slate-400 rounded-md ${error ? 'border-red-500 text-red-500' : 'border-primary text-primary'}`}>
            <input type={type} name={name} onChange={onChange} placeholder={placeholder} className='w-full h-full outline-none bg-transparent placeholder:italic focus:bg-transparent' />
        </div>
        <div className='w-full h-4'>
          {error && <p className='text-xs text-red-500'>{error}</p>}
        </div>
    </div>
  )
}

export default InputField