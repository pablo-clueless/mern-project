import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../libs'
import { Spinner } from '../assets'

const initialState = { fullName: '', username: '', email: '', password: '',confirm_password: '' }
const initialError = { email: null, password: null, confirm_password: null }
const url = import.meta.env.VITE_URL

const Signup = () => {
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const { inputs, handleChange, resetValues } = useFormInputs(initialState)
  const [inputError, setInputError] = useState(initialError)
  const navigate = useNavigate()

  const isMatch = (value, checker) => {
    if(value === checker) {
      return true
    } else return false
  }

  const handleSignup = async(e) => {
    e.preventDefault()
    
    const { fullName, username, email, password, confirm_password } = inputs
    if(!fullName || !username || !email || !password || !confirm_password) {
      return alert('Please fill all fields!')
    }
    if(!EMAIL_REGEX.test(email)) {
      return setInputError({...initialError, email: 'Please enter a valid email address'})
    } else {
      setInputError({...initialError, email: null})
    }
    if(!PASSWORD_REGEX.test(password)) {
      return setInputError({...initialError, password: 'Password must be at least 8 chracters long and contain at least a uppercase letter, lowercase letter, a number and a special character'})
    } else {
      setInputError({...initialError, password: null})
    }
    if(!isMatch(password, confirm_password)) {
      return setInputError({...initialError, confirm_password: 'Passwords do not match.'})
    } else {
      setInputError({...initialError, confirm_password: null})
    }
    const headers = { 'Content-Type': 'application/json' }
    const payload = { fullName, username, email, password }
    const data = await sendRequest(`${url}/auth/signup`, 'POST', JSON.stringify(payload), headers)
    if(!data || data === undefined) return
    navigate('/signin')
  }

  return (
    <>
    {error && <Toast type='error' message={error} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-welcome bg-no-repeat bg-contain bg-center'>
      <div className='w-4/5 md:w-500 flex flex-col items-center bg-white bg-opacity-75 py-4'>
        <p className='text-2xl font-bold font-aboreto text-primary mt-2 mb-4'>Welcome!</p>
        <form onSubmit={handleSignup} className='w-full flex flex-col items-center justify-center p-4'>
          <InputField label='Fullname' type='text' name='fullName' onChange={handleChange} placeholder='John Doe' />
          <InputField label='Username' type='text' name='username' onChange={handleChange} placeholder='john-doe' />
          <InputField label='Email' type='email' name='email' onChange={handleChange} placeholder='john.doe@example.com' />
          <InputField label='Password' type='password' name='password' onChange={handleChange} placeholder='********' error={inputError.password} />
          <InputField label='Confirm Password' type='password' name='confirm_password' onChange={handleChange} placeholder='********' error={inputError.confirm_password} />
          <Button type='submit' label={loading ? <Spinner /> : 'Signup'} />
        </form>
        <p className='my-2'>Do you have an account?
          <Link to='/signin' className='text-blue-500 underline ml-2'>Signin</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Signup