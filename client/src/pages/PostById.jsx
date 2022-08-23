import React from 'react'
import { useParams } from 'react-router-dom'

const PostById = () => {
    const { id } = useParams()
    
  return (
    <div>PostById</div>
  )
}

export default PostById