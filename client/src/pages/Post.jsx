import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'

import { useHttpRequest } from '../hooks'
import { Fallback, Toast } from '../components'

const url = import.meta.env.VITE_URL

const Post = () => {
  const { id } = useParams()
  const {clearError, httpError, loading, sendRequest } = useHttpRequest()
  const [post, setPost] = useState(null)

  const getPostById = async() => {
    const data = await sendRequest(`${url}/post/get/${id}`)
    console.log(data)
  }

  useEffect(() => {
    getPostById()
  },[])

  return (
    <>
    {httpError && <Toast type='error' message={httpError} onClose={clearError} />}
    <div className='w-screen h-screen grid place-items-center'>
      <div>
        {/* {post && (<div></div>)} */}
      </div>
    </div>
    </>
  )
}

export default Post