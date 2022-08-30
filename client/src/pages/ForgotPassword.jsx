import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, Fallback, InputField, Toast } from '../components'
import { EMAIL_REGEX } from '../libs'

const url = import.meta.env.VITE_URL
const initialState = {email: ''}

const ForgotPassword = () => {
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { inputs, handleChange } = useFormInputs(initialState)
  const [success, setSuccess] = useState(null)

  const passwordResetHandler = async(e) => {
    e.preventDefault()

    const { email } = inputs
    if(!EMAIL_REGEX.test(email) || !email) return alert('Email is invalid')
    const data = await sendRequest(`${url}/auth/forgot-password`, 'POST', JSON.stringify(email))
    if(!data || data === undefined) return
    console.log(data)
  }

  return (
    <>
    {success && <Toast type='success' message={success} onClose={() => setSuccess(null)} />}
    {loading && <Fallback />}
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-pw-reset bg-no-repeat bg-center bg-contain'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white bg-opacity-75 py-4 rounded-md'>
        <p className='text-3xl font-semibold text-primary mb-8'>Reset password</p>
        <p className='text-sm mt-4 mb-8'>An email with instructions on how to reset your password</p>
        <form onSubmit={passwordResetHandler} className='w-full flex flex-col items-center'>
          <InputField label='Email' type='email' name='email' onChange={handleChange} placeholder='john.doe@example.com' />
          <Button type='submit' label='Reset Password' />
        </form>
        <div className='w-full flex flex-col items-center gap-4 my-6'>
          <Link to='/' className='text-blue-500 underline underline-offset-2 ml-2'>Go home</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword