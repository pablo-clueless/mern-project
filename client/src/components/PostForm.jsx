import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FiImage, FiSend, FiVideoOff, FiX } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { useStateContext } from '../contexts/ContextProvider'
import { Button, Modal, Toast } from '../components'
import { useHttpRequest } from '../hooks'
import { Spinner } from '../assets'

const url = import.meta.env.VITE_URL

const PostForm = () => {
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const { user, isLoggedIn } = useSelector(store => store.auth)
    const [previewURL, setPreviewURL] = useState(null)
    const { handleUnclick } = useStateContext()
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('token')
    const id = user._id
    const [openModal, setOpenModal] = useState(false)

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
        e.stopPropagation()
        
        if(!isLoggedIn) return () => handleUnclick('new_post') && navigate('/signin')
        if(!message && !image) return alert('Post cannot be empty')
        const formData = new FormData()
        formData.append('body', message)
        formData.append('image', image)
        formData.append('createdBy', id)
        const headers = { 'x-access-token': token }
        const data = await sendRequest(`${url}/post/create`, 'POST', formData, headers)
        if(!data || data === undefined) return
        window.location.reload(false)
    }

    const clearPreviewURL = () => {
        setImage(null)
        setPreviewURL(null)
    }

    const closePostForm = () => {
        setImage(null); setMessage('')
        handleUnclick('new_post')
    }

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    {openModal && <Modal message='Do you want to discard this post' onClose={() => setOpenModal(false)} onConfirm={closePostForm} />}
    <div className='w-screen h-screen grid place-items-center bg-slate-700 bg-opacity-80 fixed top-0 left-0 backdrop'>
        <form onSubmit={handleCreatePost} className='w-90 md:w-700 h-auto bg-white dark:bg-slate-700 border-thin border-slate-400 rounded-lg mb-6 p-4'>
            <div className='w-full flex items-center justify-between my-2 px-3'>
                <div>
                    <p className='text-xl'>New Post</p>
                </div>
                <button className='rounded-full p-2 bg-slate-400 text-white' onClick={() => setOpenModal(true)}>
                    <FiX />
                </button>
            </div>
            <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Create a post...' className='focus:outline-none w-full h-300 rounded-lg p-2 text-sm bg-transparent text-slate-900 dark:text-white border-thin border-slate-400 appearance-none rounded-tg placeholder:text-gray-400 resize-none'></textarea>
            <footer className='w-full h-24 flex items-center justify-between mt-2'>
                <div className='flex items-center gap-4'>
                    <label className='w-10 h-10 flex items-center justify-center bg-slate-400 text-white rounded-full cursor-pointer' title='Add image'>
                        <FiImage />
                        <input type='file' onChange={filePicker} className='w-0 h-0' />
                    </label>
                    <label className='w-10 h-10 flex items-center justify-center bg-black text-white rounded-full cursor-pointer' title='Add video'>
                        <FiVideoOff />
                        <input type='file' onChange={filePicker} className='w-0 h-0' accept='video/' disabled />
                    </label>
                    {previewURL && (
                        <div className='w-20 h-20 rounded-md border-thin border-slate-400 relative'>
                            <div className='bg-slate-500 text-white text-sm rounded-full p-1 absolute -top-2 -right-2 cursor-pointer' children={<FiX/>} onClick={clearPreviewURL} />
                            <img src={previewURL} className='w-full h-full object-cover rounded-md' />
                        </div>
                    )}
                </div>
                <Button type='submit' label={loading ? <span className='flex items-center gap-4'>Sending <Spinner /></span> : <span className='flex items-center gap-4'>Send <FiSend /></span>} />
            </footer>
        </form>
    </div>
    </>
  )
}

export default PostForm