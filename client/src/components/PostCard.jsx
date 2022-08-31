import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi'
import Cookies from 'universal-cookie'
import { motion } from 'framer-motion'

import { addToLike, removeFromLike } from '../store/features/postSlice'
import { useHttpRequest } from '../hooks'
import { Toast } from '../components'
import { Default } from '../assets'

const url = import.meta.env.VITE_URL

const initial = { opacity: 0, scale: 0.5};
const animate = {opacity: 1,scale: 1};
const transition = {default: {duration: 1, ease: [0, 0.71, 0.2, 1.01]}};
const scale = {type: 'spring',stiffness: 100,dumping: 5,restDelta: 0.001};

const PostCard = ({_id, body, createdBy, createdOn, image, likes, comments}) => {
    const { clearError, httpError, sendRequest } = useHttpRequest()
    const { user, isLoggedIn } = useSelector(store => store.auth)
    const [imageFullScreen, setImageFullScreen] = useState(false)
    const { isLiked } = useSelector(store => store.post)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('token')

    const isInLiked = isLiked.find(liked => liked === _id)

    const handleLike = async() => {
        if(!isLoggedIn) return navigate('/signin')
        const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
        const payload = { postId: _id, action: 'like'}
        const data = await sendRequest(`${url}/post/like`, 'POST', JSON.stringify(payload), headers)
        if(!data || data === undefined) return
        dispatch(addToLike(_id))
        if(data) return window.location.reload(false)
    }
    
    const handleUnlike = async() => {
        if(!isLoggedIn) return navigate('/signin')
        const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
        const payload = { postId: _id, action: 'unlike'}
        const data = await sendRequest(`${url}/post/like`, 'POST', JSON.stringify(payload), headers)
        if(!data || data === undefined) return
        dispatch(removeFromLike(_id))
        if(data) return window.location.reload(false)
    }

    const handleComment = async(e) => {
        e.preventDefault()

        if(!isLoggedIn) return navigate('/signin')
        if(!comment) return alert('Cannot post empty comment')
        const payload = { postId: _id, by: user._id, comment, action: 'add-comment' }
        const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
        const data = await sendRequest(`${url}/post/comment`, 'POST', JSON.stringify(payload), headers)
        if(data) return window.location.reload(false)
    }

    const deletePost = async(e) => {
        e.preventDefault()
        const headers = { 'x-access-token': token }
        const data = await sendRequest(`${url}/post/delete/${id}`, 'DELETE', null, headers)
        if(data) return window.location.reload(false)
    }
    
  return (
    <>
    {imageFullScreen && image && (<div className='w-screen h-screen grid place-items-center bg-gray-100 bg-opacity-60 fixed top-0 left-0 cursor-pointer image' onClick={() => setImageFullScreen(false)}>
        <motion.img src={image} alt='' className='w-1/2' initial={initial} animate={animate} transition={{default: transition, scale: scale}} onClick={(e) => e.stopPropagation()} />
    </div>)}
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-full flex flex-col bg-white dark:bg-slate-700 rounded-md p-2'>
        <div className='w-full flex items-center justify-between px-2'>
            <div className='flex items-center gap-4'>
                <div className='w-10 h-10 rounded-full'>
                    {createdBy?.image ? (
                        <img src={createdBy.image} alt='' className='w-full h-full rounded-full object-cover' />
                    ) : (
                        <img src={Default} alt='default image' className='w-full h-full rounded-full object-cover' />
                    )}
                </div>
                <div className='flex flex-col'>
                    <p className='text-lg text-primary font-light'>@{createdBy.name}</p>
                    <p className='text-xs dark:text-white'>{new Date(createdOn).toLocaleString()}</p>
                </div>
            </div>
            <div>
                <FiMoreHorizontal className='text-xl dark:text-white cursor-pointer' title='More Options' />
            </div>
        </div>
        <div className='w-full flex flex-col items-center my-1 dark:text-white'>
            {image && (<div className='w-300 my-2 rounded-lg cursor-pointer' onClick={() => {}}>
                <img src={image} alt='post-image' className='w-full object-cover rounded-lg' onClick={() => setImageFullScreen(true)} />
            </div>)}
            <div className='w-full p-2'>
                <p>{body}</p>
            </div>
        </div>
        <div className='w-full flex items-center justify-between text-sm dark:text-white'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                    <button onClick={isInLiked ? handleUnlike : handleLike}>
                        <FiHeart className={`cursor-pointer ${isInLiked ? 'fill-red-500' : ''}`} title={isInLiked ? 'Unlike Post' : 'Like Post'} />
                    </button>
                    <p>{likes}</p>
                </div>
                <div className='flex items-center gap-1'>
                    <Link to={`/posts/${_id}`}>
                        <FiMessageCircle className='cursor-pointer' title='Comment' />
                    </Link>
                    <p>{comments.length}</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default PostCard