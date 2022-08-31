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
    try {
      const data = await sendRequest(`${url}/auth/signin`, 'POST', JSON.stringify(payload), headers)
      if(!data || data === undefined) return
      const { token, refreshToken, user } = data
      cookies.set('token', token)
      cookies.set('refreshToken', refreshToken)
      cookies.set('devUserId', user._id)
      dispatch(login(user))
      navigate('/')
    } catch (error) {}
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
        clearError()
    },5000)
    return () => clearTimeout(timeOut)
},[httpError])

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-login bg-center bg-cover'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white dark:bg-slate-700 bg-opacity-75 py-4 rounded-md border-thin border-slate-400'>
        <p className='text-3xl font-semibold text-primary mb-8'>Welcome Back</p>
        {/* TODO: Implement Google and Github OAuth */}
        <div className='flex flex-col md:flex-row items-center gap-4 mt-4 mb-8'>
          <Button type='button' label='Google' icon={<FaGoogle/>} onClick={() => {}} disabled />
          <Button type='button' label='Github' icon={<FaGithub/>} onClick={() => {}} disabled />
        </div>
        <form onSubmit={signinHandler} className='w-full flex flex-col items-center'>
          <InputField label='Username' type='text' name='username' onChange={handleChange} placeholder='john-doe' />
          <InputField label='Password' type='password' name='password' onChange={handleChange} placeholder='********' />
          <div className='w-4/5 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <input type='checkbox' className='w-4 h-4 cursor-pointer' disabled />
              <span className='text-md dark:text-white'>Keep me logged in</span>
            </div>
            <Link to='/forgot-password' className='text-md text-blue-500 underline underline-offset-2 ml-2'>Forgot password?</Link>
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