import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiImage, FiVideo, FiX } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { Toast } from '../components'
import { useHttpRequest } from '../hooks'
import { Spinner } from '../assets'
import { useEffect } from 'react'

const url = import.meta.env.VITE_URL

const PostForm = () => {
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const { user, isLoggedIn } = useSelector(store => store.auth)
    const [message, setMessage] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const cookies = new Cookies()
    const token = cookies.get('token')
    const id = user._id

    const filePicker = (e) => {
        let pickedFile = e.target?.files[0]
        const { type } = pickedFile
        if(type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png' || type === 'image/gif' || type === 'video/mp4') {
            setFile(pickedFile)
        } else return setError('Wrong file type')
        console.log(pickedFile)
    }

    const handleCreatePost = async(e) => {
        e.preventDefault()
        
        if(!message && !file) return setError('Post cannot be empty')
        const formData = new FormData()
        formData.append('body', message)
        formData.append('image', file)
        formData.append('createdBy', id)
        const headers = { 'x-access-token': token }
        const data = await sendRequest(`${url}/post/create`, 'POST', formData, headers)
        if(!data || data === undefined) return
        window.location.reload(false)
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setError(null)
        },5000)
        return () => clearTimeout(timeOut)
    },[error])

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    {error && <Toast type='warning' message={error} onClose={() => setError(null)} />}
    <form onSubmit={handleCreatePost} onClick={(e) => e.stopPropagation()} className='w-full h-full p-4'>
        <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Create a post...' className='focus:outline-none w-full rounded-lg p-2 text-sm bg-transparent text-slate-900 dark:text-white border-thin border-slate-400 appearance-none rounded-tg placeholder:text-gray-400 resize-none'></textarea>
        <footer className='w-full flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <label className='w-6 h-6 flex items-center justify-center text-primary rounded-sm cursor-pointer' title='Add image'>
                    <FiImage />
                    <input type='file' onChange={filePicker} className='w-0 h-0' />
                </label>
                <label className='w-6 h-6 flex items-center justify-center text-primary rounded-sm cursor-pointer' title='Add video'>
                    <FiVideo />
                    <input type='file' onChange={filePicker} className='w-0 h-0' accept='video/mp4' />
                </label>
            </div>
            {file && (<div className='flex items-center gap-1 p-1 border-thin border-slate-400 rounded-sm' onClick={() => setFile(null)}>
                <p className='text-xs dark:text-white'>{file.name}</p>
                <FiX className='text-xs cursor-pointer' />
            </div>)}
            <button type='submit' className='px-2 py-1 bg-primary text-white hover:scale-95 ease-in-out duration-700'>
                {loading ? <Spinner /> : 'Send'}
            </button>
        </footer>
    </form>
    </>
  )
}

export default PostForm