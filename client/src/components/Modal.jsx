import React from 'react'

const Modal = ({message, onConfirm, onClose}) => {
  return (
    <div className='w-screen h-screen absolute top-0 left-0 grid place-items-center bg-slate-300 bg-opacity-50 backdrop'>
        <div className='w-4/5 md:w-500 grid place-items-center bg-white dark:bg-slate-500 border-thin border-slate-400 rounded-lg py-4'>
            <div className='text-center my-4'>
                <p className='text-xl text-slate-400'>{message}</p>
            </div>
            <div className='w-4/5 md:w-3/5 flex items-center justify-between px-3 py-5 my-6'>
                <button onClick={onClose} className='px-4 py-2 bg-red-600'>
                    Cancel
                </button>
                <button onClick={onConfirm} className='px-4 py-2 bg-green-600'>
                    Ok
                </button>
            </div>
        </div>
    </div>
  )
}

export default Modal