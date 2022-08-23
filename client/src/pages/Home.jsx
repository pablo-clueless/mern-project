import React from 'react'

import { Searchbar } from '../components'

const Home = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='w-full h-full mt-16 py-2'></div>
      <Searchbar />
    </div>
  )
}

export default Home