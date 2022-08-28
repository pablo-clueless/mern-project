import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiEye, FiHeart, FiTrash } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { addToLike, removeFromLike } from '../store/features/postSlice'
import { useHttpRequest } from '../hooks'
import { Toast } from '../components'
import { Default } from '../assets'

const url = import.meta.env.VITE_URL

const PostCard = ({_id, body, createdBy, createdOn, image, likes, comments}) => {
    const { clearError, httpError, sendRequest } = useHttpRequest()
    const { user, isLoggedIn } = useSelector(store => store.auth)
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
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-90 md:w-600 flex flex-col items-center bg-white dark:bg-slate-500 text-slate-900 dark:text-white border-thin border-slate-400 rounded-md py-3 relative'>
        <div className='w-full flex flex-row items-center gap-4 px-3'>
            <div className='w-12 h-12 rounded-full bg-slate-400'>
                {createdBy.image ? (
                    <img src={createdBy?.image} alt='' className='w-full h-full rounded-full object-cover' />
                ) : (
                    <img src={Default} alt='default image' className='w-full h-full rounded-full object-cover' />
                )}
            </div>
            <div className='w-full flex flex-col'>
                <p className='text-xl text-primary dark:text-white font-light'>@{createdBy.name}</p>
                <p className='text-xs'>{new Date(createdOn).toLocaleString()}</p>
            </div>
        </div>
        <div className='w-full grid place-items-center my-2 border-t-thin border-b-thin border-slate-400 px-3'>
            {image && (<div className='w-300 my-2 rounded-lg'>
                <img src={image} alt='post-image' className='w-full object-cover rounded-lg' />
            </div>)}
            <div className='w-full p-2'>
                <p>{body}</p>
            </div>
        </div>
        <div className='w-full flex items-center justify-between gap-4 px-8'>
            <div>
                <Link to={`/posts/${_id}`}>
                    <FiEye className='text-lg cursor-pointer' />
                </Link>
            </div>
            <div>
                {isInLiked ? (
                    <button onClick={handleUnlike}>
                        <FiHeart className='text-lg fill-red-700 cursor-pointer' title='Unlike Post' />
                    </button>
                ) : (
                    <button onClick={handleLike}>
                        <FiHeart className='text-lg fill-transparent cursor-pointer' title='Like Post' />
                    </button>
                )}
            </div>
        </div>
        <div className='w-full flex items-center justify-between px-4 py-2 border-t-thin border-slate-400 my-2'>
            <div className='flex items-center gap-4'>
                {user?._id === createdBy?.id && isLoggedIn && (
                    <button onClick={deletePost}>
                        <FiTrash className='text-lg cursor-pointer' title='Delete Post' />
                    </button>
                )}
            </div>
            <div className='flex items-center gap-4'>
                <p className='text-md'>Comments: {comments.length}</p>
                <p className='text-md'>Likes: {likes}</p>
            </div>
        </div>
        <div className='w-full flex items-center gap-4 px-3'>
            <div className='w-8 h-8 rounded-full'>
                <img src={user?.image} alt={user?.username} title={user?.username} className='w-full h-full object-cover rounded-full' />
            </div>
            <form onSubmit={handleComment} className='w-full flex items-center rounded-md border-thin border-slate-400 px-1'>
                <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} className='w-full h-10 bg-transparent text-md font-thin outline-none px-2 py-1' />
                <button type='submit' className='bg-primary text-white border-thin border-primary hover:bg-white hover:text-primary rounded-md text-sm px-2 py-1 transition-all duration-500 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:text-white' disabled={!comment}>
                    Comment
                </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default PostCard