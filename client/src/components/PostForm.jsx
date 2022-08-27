import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiImage, FiSend, FiX } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { useHttpRequest } from '../hooks'
import { Button, Toast } from '../components'
import { Spinner } from '../assets'

const url = import.meta.env.VITE_URL

const PostForm = () => {
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const [previewURL, setPreviewURL] = useState(null)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)
    const { isLoggedIn } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('token')
    const id = cookies.get('id')

    const filePicker = (e) => {
        let file = e.target?.files[0]
        const { type } = file
        if(type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {
            setImage(file)
            const fileReader = new FileReader()
            fileReader.onload = () => setPreviewURL(fileReader.result)
            fileReader.readAsDataURL(file)
        } else return alert('Wrong file type')
    }

    const handleCreatePost = async(e) => {
        e.preventDefault()
        
        if(!isLoggedIn) return navigate('/signin')

        if((!message && image) || (message && !image)) {
            const formData = new FormData()
            formData.append('body', message)
            formData.append('image', image)
            formData.append('createdBy', id)
            const headers = {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token
            }
            const data = await sendRequest(`${url}/post/create`, 'POST', formData, headers)
            if(!data || data === undefined) return
        } else return alert('Post cannot be empty')
    }

    const clearPreviewURL = () => setPreviewURL(null)

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <form onSubmit={handleCreatePost} className='w-90 border-thin border-slate-400 rounded-lg mb-6 p-4'>
        <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Create a post...' className='focus:outline-none w-full rounded-lg p-2 text-sm bg-transparent text-slate-900 dark:text-white border border-thin border-slate-400 appearance-none rounded-tg placeholder:text-gray-400'></textarea>
        <footer className='w-full flex items-center justify-between mt-2'>
            <div className='flex items-center gap-4'>
                <label className='w-10 h-10 flex items-center justify-center bg-slate-400 text-white rounded-full cursor-pointer'>
                    <FiImage />
                    <input type='file' onChange={filePicker} className='w-0 h-0' />
                </label>
                {previewURL && (
                    <div className='w-20 h-20 rounded-md relative'>
                        <div className='bg-primary text-white text-sm rounded-full absolute -top-2 -right-2 cursor-pointer' children={<FiX/>} onClick={clearPreviewURL} />
                        <img src={previewURL} className='w-full h-full object-cover rounded-md' />
                    </div>
                )}
            </div>
            <Button type='submit' label={loading ? <span className='flex items-center gap-4'>Sending <Spinner /></span> : <span className='flex items-center gap-4'>Send <FiSend /></span>} />
        </footer>
    </form>
    </>
  )
}

export default PostForm