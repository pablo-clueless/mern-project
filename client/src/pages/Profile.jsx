import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
        <div>
          <img src={user.image} alt={user?.fullName} className='w-150 h-150 rounded-full object-cover' />
          <p className='text-3xl font-semibold text-primary'>{user?.fullName}</p>
          <p>@{user?.username}</p>
        </div>
      )}
    </div>
    </>
  )
}

export default Profile