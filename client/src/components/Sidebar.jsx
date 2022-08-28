import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import { logout } from '../store/features/authSlice'
import { Spinner, NAVLINKS } from '../assets'
import { useHttpRequest } from '../hooks'
import { Toast } from './'

const url = import.meta.env.VITE_URL

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext()
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const { user, isLoggedIn } = useSelector(store => store.auth)
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  const handleCloseSidebar = () => {
    activeMenu && screenSize < 900 && setActiveMenu(false)
  }

  const searchHandler = async(e) => {
    e.preventDefault()

    const data = await sendRequest(`${url}/user/get/${query}`)
    setData(data.data)
    setQuery('')
  }

  const handleLogout = async() => {
  }

  return (
    <>
    {error && <Toast type='error' message={error} onClose={clearError} />}
    <div className='w-full h-full flex flex-col gap-4 px-2 py-4 md:overflow-hidden overflow-auto md:hover:overflow-auto'>
      <div className='w-full px-3 relative'>
        <form onSubmit={searchHandler} className='w-full'>
          <div className='w-full h-11 flex items-center gap-2 bg-transparent border-thin px-4 py-2 focus-within:border-slate-400 rounded-md border-primary text-primary'>
            <FiSearch className='text-xl' />
            <input type='text' name='search' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search a user' className='w-full h-full outline-none bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:italic focus:bg-transparent' />
            <div className=''>
              {loading && <Spinner />}
            </div>
          </div>
        </form>
        {/* {data && (
          <div className='w-full flex flex-col items-center bg-white rounded-md absolute -bottom-20 left-0 py-3'>
            {data.map((item) => <Card key={item._id} {...item} />)}
          </div>
        )} */}
      </div>
      <div className='h-full flex flex-col items-center justify-between'>
        <div className='w-full flex flex-col px-3'>
          {isLoggedIn ? (
            <Link to={`/user/${user._id}`} className='w-full flex items-center my-1 p-1 gap-3 rounded-md hover:bg-slate-300'>
              <div className='w-12 h-12 rounded-full'>
                <img src={user?.image} alt='' className='w-full h-full rounded-full object-fit' />
              </div>
              <div className='text-2xl text-primary font-medium'>
                <p>@{user?.username}</p>
              </div>
            </Link>
          ) : (
            <Link to='/signin' onClick={() => setActiveMenu(false)} className='px-4 py-2 bg-primary text-white'>
              Signin
            </Link>
          )}
          {NAVLINKS.map((item) => (
            <div key={item.title}>
              <p className='text-slate-900 dark:text-white m-3 mt-4 pb-2 uppercase border-b-thin border-slate-400'>
                {item.title}
              </p>
              {item.links.map((link) => (
                <Link key={link.name} to={link.link} className='flex items-center gap-4 pl-4 pt-3 text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary duration-500'>
                  {link.icon} <span>{link.name}</span>
                </Link>
              ))}
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
    <Link to={`/user/${_id}`} className='flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-md'>
      {image && <img src={image} alt={username} className='w-10 h-10 object-cover rounded-full' />}
      <p className='text-lg'>@{username}</p>
    </Link>
  )
}

export default Sidebar