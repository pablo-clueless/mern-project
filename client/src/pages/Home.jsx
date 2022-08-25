import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearFetchError } from '../store/features/postSlice'
import { Fallback, PostCard, Toast } from '../components'

const Home = () => {
  const { posts, loading, error } = useSelector(store => store.post)

  return (
    <>
    {loading && <Fallback />}
    {error && <Toast type='error' message={error.message} onClose={clearFetchError} />}
    <div className='w-screen h-screen flex items-center'>
      <div className='w-0 md:w-1/4 h-full bg-slate-200'></div>
      <div className='w-2/4 h-full flex flex-1 flex-col items-center px-2 pt-4'>
        <div className='w-full grid place-items-center'>
          {posts.length ===0 ? (
          <div className='w-full grid place-items-center'>
            <p className='text-2xl'>No posts yet</p>
          </div>
          ) : (
          <div className='w-full flex flex-col items-center gap-6 overflow-y-scroll'>
            {posts.map((post) => (
            <div key={post._id} className='w-full my-4'>
              <p className='text-xs'>{new Date(post.createdOn).toDateString()}</p>
              <p>{post.body}</p>
            </div>))}
          </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home