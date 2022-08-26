import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'
import { EMAIL_REGEX, PASSWORD_REGEX, MATCH_CHECKER } from '../libs'

const url = import.meta.env.VITE_URL

const Signup = () => {
  const {} = useFormInputs()
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()

  const signupHandler = async(e) => {
    e.preventDefault()

    const payload = {}
    const data = await sendRequest(`${url}/auth/signup`, 'POST', payload)
  }
  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-welcome bg-center bg-cover'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white bg-opacity-90 py-4 rounded-md'>
        <p className='text-3xl font-semibold text-primary mb-8'>Welcome</p>
        <form onSubmit={signupHandler} className='w-full flex flex-col items-center'>
          <InputField label='Fullname' type='text' name='fullName' onChange={() => {}} placeholder='John Doe' />
          <InputField label='Email' type='email' name='email' onChange={() => {}} placeholder='john.doe@example.com' />
          <InputField label='Username' type='text' name='username' onChange={() => {}} placeholder='john-doe' />
          <InputField label='Password' type='password' name='password' onChange={() => {}} placeholder='********' />
          <InputField label='Confirm Password' type='password' name='confirm_password' onChange={() => {}} placeholder='********' />
          <Button type='submit' label='Signin' />
        </form>
        <div className='w-full flex flex-col items-center gap-4 my-6'>
          <p className='text-md'>Have an account already?
            <Link to='/signin' className='text-blue-500 underline underline-offset-2 ml-2'>Login here.</Link>
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

export default Signup