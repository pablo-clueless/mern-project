import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiCamera, FiEdit2, FiEdit3, FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import { Button, EditUser, Fallback, Toast } from '../components'
import { useHttpRequest } from '../hooks'
import gif from '../assets/images/gif.gif'

const url = import.meta.env.VITE_URL

const Profile = () => {
  const { isClicked, handleClick } = useStateContext()
  const { loading, sendRequest } = useHttpRequest()
  const [user, setUser] = useState(null)
  const { id } = useParams()

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
    {isClicked.edit_user && <EditUser />}
    <div className='w-screen h-screen flex flex-col items-center'>
      {user && (
        <div className='w-full h-full flex flex-col items-center bg-white dark:bg-slate-700'>
          <div className='w-full h-100 md:h-200 relative'>
            <img src={gif} alt="" className='w-full h-full object-cover' />
            <FiCamera className='absolute bottom-2 right-2 text-xl text-white cursor-pointer' />
          </div>
          <div className='w-4/5 flex items-center gap-4'>
            <div className='w-100 md:w-150 h-100 md:h-150 rounded-full border-thin border-slate-400 -mt-16 md:-mt-20 relative'>
              {user?.image && <img src={user.image} alt='user' className='w-full h-full rounded-full object-cover' />}
              <p className='w-8 h-8 rounded-full p-2 bg-slate-400 text-white absolute bottom-0 right-4 cursor-pointer'>
                <FiCamera />
              </p>
            </div>
            <div className='flex flex-col'>
              <p className='text-xl md:text-3xl text-primary font-semibold'>{user?.fullName}</p>
              <div className='flex items-center gap-4'>
                <p className='text-sm md:text-xl text-slate-400 italic'>@{user?.username}</p>
                <button onClick={() => handleClick('edit_user')}><FiEdit3 /></button>
              </div>
            </div>
          </div>
          <div className='w-full text-center my-4 px-4 py-2 border-t-thin border-b-thin border-slate-400'>
            {user?.bio && <p className='text-sm md:text-xl dark:text-white'>{user.bio}</p>}
          </div>
          <div className='flex items-center gap-4 text-2xl dark:text-white my-4 px-4 py-2'>
            {user?.url && (<a href={user.url} target='_blank' rel='opener noreferrer'><FiGlobe /></a>)}
            {user?.github && (<a href={user.github} target='_blank' rel='opener noreferrer'><FiGithub /></a>)}
            {user?.linkedin && (<a href={user.linkedin} target='_blank' rel='opener noreferrer'><FiLinkedin /></a>)}
            {user?.twitter && (<a href={user.twitter} target='_blank' rel='opener noreferrer'><FiTwitter /></a>)}
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Profile