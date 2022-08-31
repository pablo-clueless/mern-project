import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearFetchError } from '../store/features/postSlice'
import { Fallback, Navbar, PostCard, PostForm, Sidebar, Toast } from '../components'

const Home = () => {
  const { posts, isLoading, error } = useSelector(store => store.post)
  const dispatch = useDispatch()

  return (
    <>
    {isLoading && <Fallback />}
    {error && <Toast type='error' message={error} onClose={() => dispatch(clearFetchError())} />}
    <div className='w-screen flex relative p-1 mt-4 overflow-y-scroll'>
      <div className='w-1/3 h-600 hidden md:block bg-white dark:bg-slate-700 rounded-md'>
        <Sidebar />
      </div>
      <div className='h-screen flex flex-1 flex-col items-center'>
        <div className='w-98 bg-white dark:bg-slate-700 rounded-md'>
          <PostForm />
        </div>
        <div className='w-98 rounded-md overflow-y-scroll mt-4 pb-20'>
          {posts?.length === 0 ? (
          <div className='w-full grid place-items-center'>
            <p className='text-2xl'>No posts yet</p>
          </div>
          ) : (
          <div className='w-full flex flex-col items-center gap-6 py-8'>
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