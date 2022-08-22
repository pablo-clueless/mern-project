import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField } from '../components'
import { PASSWORD_REGEX } from '../libs'
import { Spinner } from '../assets'

const initialState = { username: '', password: ''}
const initialError = { username: null, password: null }
const url = import.meta.env.VITE_URL

const Login = () => {
  const dispatch = useDispatch()
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const { inputs, handleChange, resetValues } = useFormInputs(initialState)
  const [inputError, setInputError] = useState(initialError)
  const [isValid, setIsValid] = useState(true)

  const handleLogin = async(e) => {
    e.preventDefault()
    
    const { username, password } = inputs
    if(!username || !password) {
      return alert('Please fill all fields!')
    }
    if(!PASSWORD_REGEX.test(password)) {
      return setInputError({...initialError, password: 'Password must be at least 8 chracters long and contain at least a uppercase letter, lowercase letter, a number and a special character'})
    } else {
      setInputError({...initialError, password: null})
    }
    const headers = { 'Content-Type': 'application/json' }
    const payload = { username, password }
    console.log(payload)
    const data = await sendRequest(`${url}/auth/signin`, 'POST', JSON.stringify(payload), headers)
    console.log(data)
  }

  return (
    <div className='w-screen h-screen grid place-items-center bg-login bg-no-repeat bg-contain bg-center'>
      <div className='w-4/5 md:w-500 flex flex-col items-center bg-white bg-opacity-75 py-4'>
        <p className='text-2xl font-bold font-aboreto text-primary mt-2 mb-4'>Welcome back!</p>
        <form onSubmit={handleLogin} className='w-full flex flex-col items-center justify-center p-4'>
          <InputField label='Username' type='text' name='username' onChange={handleChange} placeholder='username' />
          <InputField label='Password' type='password' name='password' onChange={handleChange} placeholder='password' error={inputError.password} />
          <p className='my-2'>Forgot your password?
            <Link to='/reset-password' className='text-blue-300 underline ml-2'>Reset it here</Link>
          </p>
          <Button type='submit' label={loading ? <Spinner /> : 'Login'} />
        </form>
        <p className='my-2'>Don't have an account?
          <Link to='/signup' className='text-blue-500 underline ml-2'>Signup now</Link>
        </p>
      </div>
    </div>
  )
}

export default Login