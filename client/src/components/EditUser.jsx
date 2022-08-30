import React from 'react'
import { motion } from 'framer-motion'

import { useHttpRequest } from '../hooks'
import { useStateContext } from '../contexts/ContextProvider'

const initial = { opacity: 0, scale: 0.5};
const animate = {opacity: 1,scale: 1};
const transition = {default: {duration: 1, ease: [0, 0.71, 0.2, 1.01]}};
const scale = {type: 'spring',stiffness: 100,dumping: 5,restDelta: 0.001};

const EditUser = () => {
    const { clearError, httpError, loading, sendRequest } = useHttpRequest()
    const { handleUnclick } = useStateContext()

  return (
    <div className='w-screen h-screen fixed top-0 left-0 grid place-items-center bg-white bg-opacity-50 backdrop-blur-sm' onClick={() => handleUnclick('edit_user')}>
        <motion.div initial={initial} animate={animate} transition={{default: transition, scale: scale}}>
            
        </motion.div>
    </div>
  )
}

export default EditUser