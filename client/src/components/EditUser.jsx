import React from 'react'
import { motion } from 'framer-motion'
import Cookies from 'universal-cookie'

import { useStateContext } from '../contexts/ContextProvider'
import { useFormInputs, useHttpRequest } from '../hooks'
import { Button, InputField, Toast } from '../components'

const initial = { opacity: 0, scale: 0.5};
const animate = {opacity: 1,scale: 1};
const transition = {default: {duration: 1, ease: [0, 0.71, 0.2, 1.01]}};
const scale = {type: 'spring',stiffness: 100,dumping: 5,restDelta: 0.001};

const initialState = { fullName:'',bio:'',role:'',company:'',location:'',url:'',github:'',linkedin:'',twitter:''}

const EditUser = () => {
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const { handleUnclick } = useStateContext()
    const { inputs, handleChange } = useFormInputs(initialState)
    const cookies = new Cookies()
    const token = cookies.get('token')
    const id = cookies.get('devUserId')

    const handleSubmit = async(e) => {
      e.preventDefault()

      const {fullName, bio, role, company, location, url, github, linkedin, twitter} = inputs
      const headers = { 'x-access-token': token }
      const payload = {fullName, bio, role, company, location, url, github, linkedin, twitter}
      try {
        const data = await sendRequest(`${url}/user/edit/${id}`, 'PUT', JSON.stringify(payload), headers)
      } catch (error) {}
    }

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center bg-white bg-opacity-70 backdrop-blur-sm backdrop' onClick={() => handleUnclick('edit_user')}>
        <motion.div initial={initial} animate={animate} transition={{default: transition, scale: scale}} className='w-90 md:w-600 grid place-items-center bg-white dark:bg-slate-700 rounded-md border-thin border-slate-400' onClick={(e) => e.stopPropagation()}>
            <p className='text-xl font-bold text-primary mt-1 mb-8'>Edit your profile</p>

            <form onSubmit={handleSubmit} className='w-4/5 flex flex-col md:grid grid-cols-2 place-items-center'>
              <InputField label='Fullname' type='text' name='fullName' onChange={handleChange} />
              <InputField label='Role' type='text' name='role' onChange={handleChange} />
              <InputField label='Company' type='text' name='company' onChange={handleChange} />
              <InputField label='Location' type='text' name='location' onChange={handleChange} />
              <InputField label='Website' type='text' name='url' onChange={handleChange} />
              <InputField label='Github' type='text' name='github' onChange={handleChange} />
              <InputField label='LinkedIn' type='text' name='linkedin' onChange={handleChange} />
              <InputField label='Twitter' type='text' name='twitter' onChange={handleChange} />
              <Button type='submit' label='Submit' />
            </form>
        </motion.div>
    </div>
    </>
  )
}

export default EditUser