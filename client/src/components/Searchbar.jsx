import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

const Searchbar = () => {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <div className='w-500 h-14 hidden md:block bg-white dark:bg-slate-500 border-thin border-slate-400 rounded-md px-2'>
      <form onSubmit={handleSearch} className='w-full h-full flex items-center'>
        <FiSearch className='text-2xl text-slate-400' />
        <input type="text" name='search' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for a user...' className='w-full h-full bg-transparent outline-none placeholder:italic focus:bg-transparent mx-2' />
      </form>
    </div>
  )
}

export default Searchbar