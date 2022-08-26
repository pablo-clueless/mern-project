import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useHttpRequest } from '../hooks'
import { Fallback, Toast } from '../components'

const url = import.meta.env.VITE_URL

const Profile = () => {
  const { id } = useParams()
  const {clearError, error, loading, sendRequest } = useHttpRequest()
  const [user, setUser] = useState(null)

  const getUser = async() => {
    const headers = { 'Content-Type': 'application/json' }
    const data = await sendRequest(`${url}/user/${id}`, 'GET', null, headers)
    console.log(data)
    setUser(data)
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <>
    {loading && <Fallback />}
    {error && <Toast type='error' message={error.message} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center'>
    </div>
    </>
  )
}

export default Profile