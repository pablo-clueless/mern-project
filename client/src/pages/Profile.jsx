import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FiEdit2, FiGithub, FiGlobe, FiLinkedin, FiTwitter } from 'react-icons/fi'

import { useStateContext } from '../contexts/ContextProvider'
import { Button, Fallback, Toast } from '../components'
import { useHttpRequest } from '../hooks'

const url = import.meta.env.VITE_URL

const Profile = () => {
  const { id } = useParams()
  const { loading, sendRequest } = useHttpRequest()
  const { handleClick } = useStateContext()
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
    <div className='w-screen h-screen flex flex-col items-center'>
      {user && (
        <div className='w-90 md:w-700 lg:w-900 h-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white relative'>
         
        </div>
      )}
    </div>
    </>
  )
}

export default Profile