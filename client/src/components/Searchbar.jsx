import React from 'react'
import { FiMic} from 'react-icons/fi'

const Searchbar = ({}) => {
  const recordAudio = (e) => {}
  return (
    <div className='w-4/5 md:w-500 h-14 flex items-center bg-white rounded-sm'>
      <input type="text" name='search'  />
      <button onClick={recordAudio} className=''>
        <FiMic />
      </button>
    </div>
  )
}

export default Searchbar