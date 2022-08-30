import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'
import { EMAIL_REGEX, PASSWORD_REGEX, MATCH_CHECKER } from '../libs'
import { Spinner } from '../assets'

const url = import.meta.env.VITE_URL
const initialState = { fullName: '', email: '', username: '', password: '', confirm_password: '' }

const Signup = () => {
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { inputs, handleChange } = useFormInputs(initialState)
  const navigate = useNavigate()

  const signupHandler = async(e) => {
    e.preventDefault()

    const { fullName, email, username, password, confirm_password } = inputs
    if(!fullName || !email || !username || !password || !confirm_password) return alert('Please fill all fields')
    if(!EMAIL_REGEX.test(email)) return alert('Email is invalid')
    if(!PASSWORD_REGEX.test(password)) return alert('Password is invalid')
    if(!MATCH_CHECKER(password, confirm_password)) return alert('Password do not match')

    const payload = { fullName, email, username, password }
    const headers = { 'Content-Type': 'application/json' }
    try {
      const data = await sendRequest(`${url}/auth/signup`, 'POST', JSON.stringify(payload), headers)
      if(!data || data === undefined) return
      navigate('/signin')
    } catch (error) {}
  }
  
  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen flex flex-col items-center bg-welcome bg-center bg-cover'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white bg-opacity-90 py-4 mt-4 rounded-md border-thin border-slate-400'>
        <p className='text-3xl font-semibold text-primary mb-8'>Welcome</p>
        {/* TODO: Implement Google and Github OAuth */}
        <div className='flex flex-col md:flex-row items-center gap-2 my-2'>
          <Button type='button' label='Google' icon={<FaGoogle/>} onClick={() => {}} disabled />
          <Button type='button' label='Github' icon={<FaGithub/>} onClick={() => {}} disabled />
        </div>
        <form onSubmit={signupHandler} className='w-full flex flex-col items-center'>
          <InputField label='Fullname' type='text' name='fullName' onChange={handleChange} placeholder='John Doe' />
          <InputField label='Email' type='email' name='email' onChange={handleChange} placeholder='john.doe@example.com' />
          <InputField label='Username' type='text' name='username' onChange={handleChange} placeholder='john-doe' />
          <InputField label='Password' type='password' name='password' onChange={handleChange} placeholder='********' />
          <InputField label='Confirm Password' type='password' name='confirm_password' onChange={handleChange} placeholder='********' />
          <Button type='submit' label={loading ? <Spinner/> : 'Signin'} />
        </form>
        <div className='w-full flex flex-col items-center gap-4 mt-2'>
          <p className='text-md'>Have an account already?
            <Link to='/signin' className='text-blue-500 underline underline-offset-2 ml-2'>Login here.</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup