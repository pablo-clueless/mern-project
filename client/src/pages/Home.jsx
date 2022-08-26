import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FiImage, FiX } from 'react-icons/fi'
import Cookies from 'universal-cookie'

import { useFormInputs, useHttpRequest } from '../hooks'
import { clearFetchError } from '../store/features/postSlice'
import { Fallback, InputField, PostCard, Sidebar, Toast } from '../components'

const Home = () => {
  const { clearError, httpError, loading, sendRequest } = useHttpRequest()
  const { posts, isLoading, error } = useSelector(store => store.post)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const token = cookies.get('token')
  const id = cookies.get('id')

  const filePicker = (e) => {
    let file
    file = e.target?.files[0]
    const { type } = file
    if(type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png' || type === 'image/gif') {
      setImage(file)
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    } else {
      return alert('Unsupported file type!')
    }
  }

  const postUploadHandler = async(e) => {
    e.preventDefault()

    const headers = { 'x-access-token':  token }
    const payload = {}
  }

  return (
    <>
    {loading && <Fallback />}
    {httpError && <Toast type='error' message={httpError} onClose={() => dispatch(clearFetchError())} />}
    <div className='w-screen h-screen fixed top-0 left-0 flex items-center'>
      <div className='w-1/3 hidden md:block h-screen bg-slate-200'>
        <Sidebar />
      </div>
      <div className='w-2/3 h-full flex flex-1 flex-col items-center px-2 pt-4'>
        <div className='w-full flex flex-col items-center overflow-y-scroll'>
          {posts?.length ===0 ? (
          <div className='w-full grid place-items-center'>
            <p className='text-2xl'>No posts yet</p>
          </div>
          ) : (
          <div className='w-full flex flex-col items-center gap-6 overflow-y-scroll'>
            {posts?.map((post) => (
            <div key={post._id} className='w-4/5 border-thin border-slate-400 rounded-md p-2 my-4'>
              <p className='text-xs'>{new Date(post.createdOn).toDateString()}</p>
              <p>{post.body}</p>
              {post.image && (<div className='w-full flex items-center justify-center my-2'>
                <img src={post.image} alt='post-image' className='w-200' />
                </div>)}
              <div className='flex items-center gap-8 mt-2'>
                <p>{post.likes} likes</p>
                <p>{post.comments.length} comments</p>
              </div>
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