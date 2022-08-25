import React from 'react'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Toast } from '../components'

const url = import.meta.env.VITE_URL

const Signup = () => {
  const {} = useFormInputs()
  const { clearError, error, loading, sendRequest } = useHttpRequest()

  const signupHandler = async(e) => {
    e.preventDefault()

    const payload = {}
    const data = await sendRequest(`${url}/auth/signin`, 'POST', payload)
  }
  return (
    <div className='w-screen h-screen bg-welcome bg-no-repeat bg-center bg-contain'></div>
  )
}

export default Signup