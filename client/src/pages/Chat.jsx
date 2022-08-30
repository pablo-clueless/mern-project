import React from 'react'
import { useSelector } from 'react-redux'

const Chat = () => {
  const { user, isLoggedIn } = useSelector(store => store.auth)
  const { messages }  = user

  return (
    <div className='w-screen h-screen grid place-items-center'>
      <div className='w-full flex flex-col items-center'>
        <p className='text-2xl font-bold'>Chat</p>
        <div className=''>
          {messages.length}
        </div>
      </div>
    </div>
  )
}

export default Chat