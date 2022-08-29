import React from 'react'
import { useParams } from 'react-router-dom'

import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, Fallback, InputField, Toast } from '../components'
import { PASSWORD_REGEX, MATCH_CHECKER } from '../libs'

const url = import.meta.env.VITE_URL
const initialState = { password: '', confirm_password: ''}

const PasswordReset = () => {
  const { inputs, handleChange } = useFormInputs(initialState)
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { token } = useParams()

  const handlePasswrodReset = async(e) => {
    e.preventDefault()

    const { password, confirm_password } = inputs
    if(!password || !PASSWORD_REGEX.test(password)) return alert('Password is invalid')
    if(!MATCH_CHECKER(password, confirm_password)) return alert('Password do not match')
    const headers = { 'x-access-token': token }
    try {
      const data = await sendRequest(`${url}/auth/reset-password`, 'POST', JSON.stringify(password), headers)
      if(!data || data === undefined) return
      console.log(data)
    } catch (error) {}
  }
  return (
    <>
    {loading && <Fallback />}
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center bg-pw-reset bg-no-repeat bg-center bg-contain'>
      <div className='w-90 md:w-500 flex flex-col items-center bg-white bg-opacity-75 py-4 rounded-md'>
        <p className='text-3xl font-semibold text-primary mb-8'>Enter your new password</p>
        <p className='text-sm mt-4 mb-8'>Make sure your password is strong. It should contain at least an uppercase letter, a lowercase, a number and a special</p>
        <form onSubmit={handlePasswrodReset} className='w-full flex flex-col items-center'>
          <InputField label='Password' type='password' name='password' onChange={handleChange} />
          <InputField label='Confirm Password' type='password' name='confirm_password' onChange={handleChange} />
          <Button type='submit' label='Submit' />
        </form>
      </div>
    </div>
    </>
  )
}

export default PasswordReset