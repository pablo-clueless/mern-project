import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import { useHttpRequest } from '../hooks'
import { Toast } from './'
import { Spinner } from '../assets'

const url = import.meta.env.VITE_URL

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext()
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  const handleCloseSidebar = () => {
    activeMenu && screenSize < 900 && setActiveMenu(false)
  }

  const searchHandler = async(e) => {
    e.preventDefault()

    const data = await sendRequest(`${url}/user/get/${query}`)
    setData(data.data)
    setQuery('')
  }

  return (
    <>
    {error && <Toast type='error' message={error} onClose={clearError} />}
    <div className='w-full h-screen flex flex-col gap-4 px-2 py-4 md:overflow-hidden overflow-auto md:hover:overflow-auto'>
      <div className='w-full px-3'>
        <form onSubmit={searchHandler} className='w-full'>
          <div className='w-full h-11 flex items-center gap-2 bg-transparent border-thin px-4 py-2 focus-within:border-slate-400 rounded-md border-primary text-primary'>
            <FiSearch className='text-xl' />
            <input type='text' name='search' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search a user' className='w-full h-full outline-none bg-transparent placeholder:italic focus:bg-transparent' />
            <div className=''>
              {loading && <Spinner />}
            </div>
          </div>
        </form>
      </div>
      <div className='w-full flex flex-col items-center px-3'>
        <div className='w-4/5 h-12 flex flex-col items-center gap-3 bg-slate-50 rounded-md py-1'>
          {data && data.map(item => (
            <div key={item._id} className='flex flex-col items-center'>
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

const Card = ({_id, username, image}) => {
  return (
    <Link to={`/user/${_id}`} className='flex items-center gap-2'>
      {image && <img src={image} alt={username} className='w-10 h-10 object-cover rounded-full' />}
      <p className='text-lg'>@{username}</p>
    </Link>
  )
}

export default Sidebar