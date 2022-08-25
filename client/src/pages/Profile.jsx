import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useHttpRequest } from '../hooks'
import { Fallback, Toast } from '../components'

const url = import.meta.env.VITE_URL

const Profile = () => {
  const { id } = useParams()
  const {clearError, error, loading, sendRequest } = useHttpRequest()

  const getUser = async() => {
    const headers = { 'Content-Type': 'application/json' }
    const data = await sendRequest(`${url}/user/${id}`, 'GET', null, headers)
    console.log(data)
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    <>
    {loading && <Fallback />}
    {error && <Toast type='error' message={error.message} onClose={clearError} />}
    <div>Profile</div>
    </>
  )
}

export default Profile