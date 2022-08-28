import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiEye, FiHeart, FiTrash } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { addToLike, removeFromLike } from '../store/features/postSlice'
import { Fallback, Toast } from '../components'
import { useHttpRequest } from '../hooks'

const url = import.meta.env.VITE_URL

const Post = () => {
  const { id } = useParams()
  const {clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { user, isLoggedIn } = useSelector(store => store.auth)
  const { isLiked } = useSelector(store => store.post)
  const [comment, setComment] = useState('')
  const [post, setPost] = useState(null)
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const token  = cookies.get('token')
  const userId = cookies.get('devUserId')

  const isInLiked = isLiked.find(liked => liked === id)

  const getPostById = async() => {
    const data = await sendRequest(`${url}/post/get/${id}`)
    console.log(data)
    setPost(data)
  }

  const handleLike = async() => {
    if(!isLoggedIn) return navigate('/signin')
    const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
    const payload = { postId: id, action: 'like'}
    const data = await sendRequest(`${url}/post/like`, 'POST', JSON.stringify(payload), headers)
    if(!data || data === undefined) return
    dispatch(addToLike(id))
    if(data) return window.location.reload(false)
  }

  const handleUnlike = async() => {
      if(!isLoggedIn) return navigate('/signin')
      const headers = { 'Content-Type': 'application/json', 'x-access-token': token }
      const payload = { postId: id, action: 'unlike'}
      const data = await sendRequest(`${url}/post/like`, 'POST', JSON.stringify(payload), headers)
      if(!data || data === undefined) return
      dispatch(removeFromLike(id))
      if(data) return window.location.reload(false)
  }

  const handleComment = async(e) => {
      e.preventDefault()

      if(!isLoggedIn) return navigate('/signin')
      if(!comment) return alert('Cannot post empty comment')
      const payload = { postId: id, by: user.id, comment, action: 'add-comment' }
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

  useEffect(() => {
    getPostById()
  },[])

  return (
    <>
    {loading && <Fallback />}
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen flex flex-col items-center'>
      {post && (
      <div className='w-90 md:w-700 flex flex-col items-center bg-white dark:bg-slate-700 rounded-md mt-28'>
        <div className='w-full flex items-center gap-4 px-3 my-4'>
          <div className='w-16 h-16 rounded-full border-thin border-slate-400'>
            {post?.createdBy?.image && <img src={post?.createdBy?.image} alt="" className='w-full h-full rounded-full object-cover' />}
          </div>
          <div className='flex flex-col'>
            {post?.createdBy?.name && <p className='text-2xl text-primary'>@{post.createdBy.name}</p>}
            {post?.createdOn && <p className='text-sm text-slate-400'>{new Date(post?.createdOn).toLocaleString()}</p>}
          </div>
        </div>
        <div className='w-full border-t-thin border-b-thin border-slate-400'>
          {post?.image && (
            <div className='w-full md:w-400 rounded-md border-thin border-slate-400 my-4'>
              <img src={post?.image} alt='post-image' className='w-full rounded-md object-cover' />
            </div>
          )}
          {post?.body && (
            <div className='w-full px-4 py-2 text-xl my-2'>
              <p className='text-slate-900 dark:text-white font-light'>{post?.body}</p>
            </div>
          )}
        </div>
        <div className='w-full flex items-center justify-between my-2 px-4'>
          <div></div>
          <div>
                {isInLiked ? (
                  <button onClick={handleUnlike}>
                        <FiHeart className='text-xl fill-red-700 cursor-pointer' title='Unlike Post' />
                    </button>
                ) : (
                  <button onClick={handleLike}>
                        <FiHeart className='text-xl fill-transparent cursor-pointer' title='Like Post' />
                    </button>
                )}
            </div>
        </div>
        <div className='w-full flex items-center justify-between px-4 py-2 border-t-thin border-b-thin border-slate-400'>
          <div className='flex items-center gap-4'>
              {user?._id === post?.createdBy?.id && isLoggedIn && (
                  <button onClick={deletePost}>
                      <FiTrash className='text-lg cursor-pointer' title='Delete Post' />
                  </button>
              )}
          </div>
          <div className='flex items-center gap-4'>
                <p className='text-lg'>Comments: {post?.comments.length}</p>
                <p className='text-lg'>Likes: {post?.likes}</p>
          </div>
        </div>
        <div className='w-full flex items-center gap-4 px-3 my-2'>
          <div className='w-8 h-8 rounded-full'>
              <img src={user?.image} alt={user?.username} title={user?.username} className='w-full h-full object-cover rounded-full' />
          </div>
          <form onSubmit={handleComment} className='w-full flex items-center rounded-md border-thin border-slate-400 px-1'>
              <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} className='w-full h-10 bg-transparent text-md font-thin outline-none px-2 py-1' />
              <button type='submit' className='bg-primary text-white border-thin border-primary hover:bg-white hover:text-primary rounded-sm text-sm px-2 py-1 transition-all duration-500 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:text-white disabled:cursor-not-allowed' disabled={!comment}>
                  Comment
              </button>
          </form>
        </div>
        <div className='w-full flex flex-col items-center gap-4 mt-2 px-4'>
          {post?.comments?.map((comment) => (<CommentCard key={comment._id} {...comment} />))}
        </div>
      </div>
      )}
    </div>
    </>
  )
}

const CommentCard = ({by, comment, createdOn}) => {
  return (
    <div className='w-full flex flex-col px-3'>
      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 rounded-full'>
          <img src={by?.image} alt='' className='w-full h-full rounded-full object-cover' />
        </div>
        <div className='flex flex-col'>
          <p className='text-md'>{by?.name}</p>
          <p className='text-xs'>{new Date(createdOn).toLocaleString()}</p>
        </div>
      </div>
      <div className=''>
        <p className='text-md'>{comment}</p>
      </div>
    </div>
  )
}

export default Post