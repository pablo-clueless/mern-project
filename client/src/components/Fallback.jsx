import React from 'react'

const Fallback = () => {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center bg-slate-200 cursor- fallback'>
      <div className='w-100 h-100 relative flex items-center justify-center'>
        <div className='w-90 h-90 absolute inline-flex border-4 border-slate-600 rounded-full animate-ping'></div>
        <div className='w-3/5 h-3/5 bg-slate-600 rounded-full animate-pulse'>
        </div>
      </div>
    </div>
  )
}

export default Fallback