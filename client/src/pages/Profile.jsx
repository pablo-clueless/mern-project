import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiEdit2, FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'

import { useHttpRequest } from '../hooks'
import { Fallback, Toast } from '../components'

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
        <div className='w-90 md:w-700 h-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative border-thin border-slate-400 rounded-md'>
          <div className='w-150 h-150 border-thin border-slate-400 rounded-full absolute -top-28 left-1/2 -translate-x-1/2'>
            <img src={user?.image} alt={user?.username} className='w-full h-full rounded-full object-cover' />
          </div>
          <div className='w-full flex flex-col items-center mt-16'>
            <p className='text-3xl text-primary font-semibold'>{user?.fullName}</p>
            <p className='text-lg text-slate-500 font-light'>@{user?.username}</p>

            <div className='flex items-center gap-4 my-2'>
              {user?.url && <a href={user?.url} className='text-xl text-slate-500'><FiGlobe /></a>}
              {user?.github && <a href={user?.github} className='text-xl text-slate-500'><FiGithub /></a>}
              {user?.twitter && <a href={user?.twitter} className='text-xl text-slate-500'><FiTwitter /></a>}
              {user?.linkedin && <a href={user?.linkedin} className='text-xl text-slate-500'><FiLinkedin /></a>}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Profile