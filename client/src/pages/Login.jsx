import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'
import { login } from '../store/features/authSlice'
import { Spinner } from '../assets'

const url = import.meta.env.VITE_URL

const initialState = { username: '', password: '' }

const Login = () => {
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { inputs, handleChange } = useFormInputs(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cookies = new Cookies()

  const signinHandler = async(e) => {
    e.preventDefault()

    const { username, password } = inputs
    if(!username || !password) {
      return alert('Please fill all fields')
    }
    const payload = { username,password }
    const headers = { 'Content-Type': 'application/json' }
    const data = await sendRequest(`${url}/auth/signin`, 'POST', JSON.stringify(payload), headers)
    if(!data || data === undefined) return
    const { token, user } = data
    cookies.set('token', token)
    cookies.set('devUserId', user._id)
    dispatch(login(user))
    navigate('/')
  }

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-login bg-center bg-cover'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white dark:bg-slate-700 bg-opacity-75 py-4 rounded-md'>
        <p className='text-3xl font-semibold text-primary mb-8'>Welcome Back</p>
        {/* TODO: Implement Google and Github OAuth */}
        <div className='flex items-center gap-4 mt-4 mb-8'>
          <Button type='button' label='Signin with Google' icon={<FaGoogle/>} onClick={() => {}} disabled />
          <Button type='button' label='Signin with Github' icon={<FaGithub/>} onClick={() => {}} disabled />
        </div>
        <form onSubmit={signinHandler} className='w-full flex flex-col items-center'>
          <InputField label='Username' type='text' name='username' onChange={handleChange} placeholder='john-doe' />
          <InputField label='Password' type='password' name='password' onChange={handleChange} placeholder='********' />
          <div className='w-4/5 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <input type='checkbox' className='w-4 h-4 cursor-pointer' />
              <span className='text-md dark:text-white'>Keep me logged in</span>
            </div>
            <Link to='/reset-password' className='text-md text-blue-500 underline underline-offset-2 ml-2'>Forgot password?</Link>
          </div>
          <Button type='submit' label={loading ? <Spinner /> : 'Signin'} />
        </form>
        <div className='w-full flex flex-col items-center gap-4 my-6'>
          <p className='text-md dark:text-white'>Don't have an account?
            <Link to='/signup' className='text-blue-500 underline underline-offset-2 ml-2'>Signup here.</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login