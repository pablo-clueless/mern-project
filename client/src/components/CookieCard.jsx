import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from './'
import { Cookie } from '../assets'

const CookieCard = () => {

  return (
    <div className='w-300 bg-white dark:bg-slate-700 border-thin border-slate-400 fixed bottom-4 left-1/2 -translate-x-1/2 px-2 backdrop'>
        <div className='w-12 absolute -top-8 left-1/2 -translate-x-1/2'>
            <img src={Cookie} alt='cookie svg' className='w-full h-full' />
        </div>
        <div className='text-md text-slate-900 dark:text-white my-4'>
            <p>We use cookies to provide a better user experience.</p>
        </div>
        <div className='w-full flex items-center justify-between px-2 my-2'>
            <Link to='/privacy-policy' className='text-sm text-primary underline underline-offset-1'>
                Privary Policy
            </Link>
            <Button label='Accept Cookies' onClick={() => {}} />
        </div>
    </div>
  )
}

export default CookieCard