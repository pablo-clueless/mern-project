import React from 'react'
import Cookies from 'universal-cookie'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Toast } from '../components'

const url = import.meta.env.VITE_URL

const Login = () => {
  const {} = useFormInputs()
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const cookies = new Cookies()

  const signinHandler = async(e) => {
    e.preventDefault()

    const payload = {}
    const data = await sendRequest(`${url}/auth/signin`, 'POST', payload)
  }

  return (
    <>
    {error && <Toast type='error' message={error.message} onClose={clearError} />}
    <div className='w-screen h-screen bg-login bg-no-repeat bg-center bg-contain'></div>
    </>
  )
}

export default Login