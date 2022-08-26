import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'

const url = import.meta.env.VITE_URL

const Login = () => {
  const {} = useFormInputs()
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const cookies = new Cookies()

  const signinHandler = async(e) => {
    e.preventDefault()

    const payload = {}
    const data = await sendRequest(`${url}/auth/signin`, 'POST', payload)
  }

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-login bg-center bg-cover'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white bg-opacity-75 py-4 rounded-md'>
        <p className='text-3xl font-semibold text-primary mb-8'>Welcome Back</p>
        <form onSubmit={signinHandler} className='w-full flex flex-col items-center'>
          <InputField label='Username' type='text' name='username' onChange={() => {}} placeholder='john-doe' />
          <InputField label='Password' type='password' name='password' onChange={() => {}} placeholder='********' />
          <Button type='submit' label='Signin' />
        </form>
        <div className='w-full flex flex-col items-center gap-4 my-6'>
          <p className='text-md'>Forgot your password?
            <Link to='/reset-password' className='text-blue-500 underline underline-offset-2 ml-2'>Reset it here</Link>
          </p>
          <p className='text-md'>Don't have an account?
            <Link to='/signup' className='text-blue-500 underline underline-offset-2 ml-2'>Signup here.</Link>
          </p>
          {/* TODO: Implement Google and Github OAuth */}
          <div className='flex flex-col items-center'>
            <Button type='button' label='Google' icon={<FaGoogle/>} onClick={() => {}} disabled />
            <Button type='button' label='Github' icon={<FaGithub/>} onClick={() => {}} disabled />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login