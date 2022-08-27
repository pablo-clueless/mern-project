import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHeart, FiMessageSquare } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { addToLike, removeFromLike } from '../store/features/postSlice'
import { useHttpRequest } from '../hooks'
import { Toast } from '../components'

const url = import.meta.env.VITE_URL

const PostCard = ({_id, body, createdBy, createdOn, image, likes, comments}) => {
    const { isLiked } = useSelector(store => store.post)
    const { isLoggedIn } = useSelector(store => store.auth)
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get('token')

    const isInLiked = isLiked.find(liked => liked === _id)

    const handleLike = async() => {
        if(!isLoggedIn) return navigate('/signin')
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
        const payload = { postId: _id, action: 'like'}
        const data = await sendRequest(`${url}/post/like`, 'POST', payload, headers)
        if(!data || data === undefined) return
        dispatch(addToLike(_id))
    }
    
    const handleUnlike = async() => {
        if(!isLoggedIn) return navigate('/signin')
        const headers = {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
        const payload = { postId: _id, action: 'unlike'}
        const data = await sendRequest(`${url}/post/like`, 'POST', payload, headers)
        if(!data || data === undefined) return
        console.log(data)
        dispatch(removeFromLike(_id))
    }
    
  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-90 md:w-600 flex flex-col items-center bg-white dark:bg-slate-500 text-slate-900 dark:text-white border-thin border-slate-400 rounded-md px-3 py-2'>
        <div className='w-full'>
            <p className='text-xs'>{new Date(createdOn).toDateString()}</p>
        </div>
        <Link to={`/posts/${_id}`} className='w-full grid place-items-center'>
            {image && (<div className='w-200 my-2'>
                <img src={image} alt='post-image' className='w-full object-cover' />
            </div>)}
            <div className='w-full p-2'>
                <p>{body}</p>
            </div>
        </Link>
        <div className='flex items-center gap-4'>
            <p className='flex items-center gap-2'>
                {isInLiked ? (
                    <button onClick={handleUnlike}>
                        <FiHeart className='text-lg fill-red-700 cursor-pointer' />
                    </button>
                ) : (
                    <button onClick={handleLike}>
                        <FiHeart className='text-lg fill-transparent cursor-pointer' />
                    </button>
                )}
                {likes}
            </p>
            <p className='flex items-center gap-2'>
                <FiMessageSquare /> {comments.length}
            </p>
        </div>
    </div>
    </>
  )
}

export default PostCard