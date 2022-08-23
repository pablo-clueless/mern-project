import React from 'react'

import { PostCard } from '../components'
import { DUMMY_POSTS } from '../dummy-user'

const Home = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <div className='w-full h-full mt-28' />

      <div className='w-full flex flex-col items-center gap-8'>
        {DUMMY_POSTS.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  )
}

export default Home