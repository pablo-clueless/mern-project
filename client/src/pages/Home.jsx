import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearFetchError } from '../store/features/postSlice'
import { Fallback, PostCard, Sidebar, Toast } from '../components'

const Home = () => {
  const { posts, isLoading, error } = useSelector(store => store.post)
  const dispatch = useDispatch()

  return (
    <>
    {isLoading && <Fallback />}
    {error && <Toast type='error' message={error} onClose={() => dispatch(clearFetchError())} />}
    <div className='w-screen h-screen flex items-center relative'>
      <div className='w-1/3 hidden md:block h-full sidebar'>
        <Sidebar />
      </div>
      <div className='w-2/3 h-full flex flex-1 flex-col items-center px-2 pt-4'>
        <div className='w-full flex flex-col items-center overflow-y-scroll mt-20 md:mt-0'>
          {posts?.length === 0 ? (
          <div className='w-full grid place-items-center'>
            <p className='text-2xl'>No posts yet</p>
          </div>
          ) : (
          <div className='w-full flex flex-col items-center gap-6 py-8 overflow-y-scroll'>
            {posts?.map((post) => (<PostCard key={post._id} {...post} />))}
          </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home

// ! 
{/* <div to={``} key={post._id} className='w-4/5 border-thin border-slate-400 rounded-md text-slate-900 dark:text-white p-2 my-4'>
              <p className='text-xs'>{new Date(post.createdOn).toDateString()}</p>
              <p className='my-1 mp-2'>{post.body}</p>
              {post.image && (<div className='w-full flex items-center justify-center my-2'>
                <img src={post.image} alt='post-image' className='w-200' />
                </div>)}
              <div className='flex items-center gap-8 mt-2'>
                <p className='flex items-center gap-2'>{post.likes} <FiHeart /></p>
                <p className='flex items-center gap-2'>{post.comments.length} <FiMessageSquare /></p>
              </div>
            </div> */}