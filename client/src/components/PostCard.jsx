import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiMessageSquare, FiShare } from 'react-icons/fi'

const PostCard = ({id, body, createdBy, creatorImage, createdOn, image, likes, shares, comments}) => {
  return (
    <div className='w-90 md:w-700 flex flex-col items-center bg-white dark:bg-slate-500 rounded-md px-3 py-2'>
        <div className='w-full flex items-center gap-3 mb-2'>
            <Link to={`/user/${createdBy}`} className='w-12 h-12 rounded-full'>
                <img src={creatorImage} alt={createdBy} className='w-full h-full rounded-full object-cover' />
            </Link>
            <div className='flex flex-col items-start'>
                <Link to={`/user/${createdBy}`} className='text-lg text-slate-800 dark:text-white'>
                    @{createdBy}
                </Link>
                <p className='text-xs text-slate-400'>{createdOn}</p>
            </div>
        </div>
        <Link to={`/posts/${id}`} className='w-full flex flex-col border-t-thin border-slate-400'>
            <p className='my-2 p-3 text-slate-500 dark:text-white'>{body}</p>
            {image && (
            <div className='w-full h-200 rounded-xl'>
                <img src={image} alt="post-image" className='w-full h-full object-contain rounded-xl' />
            </div>
            )}
        </Link>
        <div className='w-full md:w-4/5 flex items-center justify-center border-t-thin border-slate-400 gap-20 mt-4 mb-2 py-2'>
            <div className='flex items-center gap-1'>
                <FiHeart className=''/> {likes}
            </div>
            <div className='flex items-center gap-1'>
                <FiMessageSquare /> {comments.length}
            </div>
            <div className='flex items-center gap-1'>
                <FiShare /> {shares}
            </div>
        </div>
    </div>
  )
}

export default PostCard