import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiEdit2, FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'

import { useHttpRequest } from '../hooks'
import { Button, Fallback, Toast } from '../components'

const url = import.meta.env.VITE_URL

const Profile = () => {
  const { id } = useParams()
  const { loading, sendRequest } = useHttpRequest()
  const [user, setUser] = useState(null)

  const getUser = async() => {
    const data = await sendRequest(`${url}/user/${id}`)
    setUser(data)
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <>
    {loading && <Fallback />}
    <div className='w-screen h-screen grid place-items-center'>
      {user && (
        <div className='w-90 md:w-700 lg:w-900 h-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative border-thin border-slate-400 rounded-md'>
          <div className='w-150 h-150 border-thin border-slate-400 rounded-full absolute -top-28 left-1/2 -translate-x-1/2'>
            <img src={user?.image} alt={user?.username} className='w-full h-full rounded-full object-cover' />
          </div>
          <div className='w-full flex items-center justify-between px-4 py-2 mt-16 sm:mt-0 border-b-thin border-slate-400'>
            <div className='flex items-center gap-2'>
              <p className='text-sm'>Followers: {user?.followers.length}</p>
              <p className='text-sm'>Following: {user?.following.length}</p>
              <p className='text-sm'>Posts: {user?.posts.length}</p>
            </div>
            <div>
              <Button label='Follow' />
            </div>
          </div>
          <div className='w-full flex flex-col items-center border-b-thin border-slate-400'>
            <p className='text-3xl text-primary font-semibold'>{user?.fullName}</p>
            <p className='text-lg text-slate-500 font-light'>@{user?.username}</p>
            <div className='flex items-center gap-8 mt-8'>
              {user?.url && <a href={user?.url} className='text-2xl text-slate-500 hover:text-primary ease-in-out duration-300'>
                <FiGlobe />
              </a>}
              {user?.github && <a href={user?.github} className='text-2xl text-slate-500 hover:text-primary ease-in-out duration-300'>
                <FiGithub />
              </a>}
              {user?.twitter && <a href={user?.twitter} className='text-2xl text-slate-500 hover:text-primary ease-in-out duration-300'>
                <FiTwitter />
              </a>}
              {user?.linkedin && <a href={user?.linkedin} className='text-2xl text-slate-500 hover:text-primary ease-in-out duration-300'>
                <FiLinkedin />
              </a>}
            </div>
            <div className='flex items-center gap-2 text-lg font-light my-6'>
              {user?.role && <p className='capitalize'>{user?.role}</p>}
              {user?.company && <p className='capitalize'> - {user?.company}</p>}
            </div>
            <p className='text-lg font-light mb-4'>{user?.location && user?.location}</p>
          </div>
            <div className='w-full flex items-center text-center my-4 px-3'>
              {user?.bio && <p className='text-xl font-light'>{user?.bio}</p>}
            </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Profile