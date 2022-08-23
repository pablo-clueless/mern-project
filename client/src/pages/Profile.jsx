import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiBriefcase, FiEdit3, FiGithub, FiGlobe, FiLinkedin, FiMapPin, FiTwitter } from 'react-icons/fi'

import { Button } from '../components'
import { useHttpRequest } from '../hooks'
import { Spinner } from '../assets'
import { DUMMY_USER } from '../dummy-user'

const url = import.meta.env.VITE_URL
const tabs = { posts: false, followers: false, following: false }

const Profile = () => {
  const { user } = useSelector(store => store.auth)
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const [activeTab, setActiveTab] = useState(tabs)

  const switchTabs = (tab) => (
    setActiveTab({...tabs, [tab]: true})
  )

  const followUser = async(e) => {
    e.preventDefault()
  }

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-gray-500 relative'>
      <div className='w-full h-300 absolute top-0 left-0'>
        <img src={DUMMY_USER.banner} alt="" className='w-full h-full object-cover' />
      </div>
      <div className='w-90 md:w-800 h-auto md:h-500 flex flex-col bg-white dark:bg-slate-500 relative rounded-md border-thin border-slate-200 mt-20'>
        <div className='w-150 h-150 rounded-full absolute -top-16 left-1/2 -translate-x-1/2'>
          <img src={DUMMY_USER.image} alt="user" className='w-full h-full rounded-full object-cover' />
        </div>
        <div className='w-full flex flex-col md:flex-row items-center justify-between px-4 py-2 mt-28 md:mt-4'>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-lg font-bold text-primary'>{DUMMY_USER.posts.length}</p>
              <p className='text-slate-500 dark:text-white'>Posts</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-lg font-bold text-primary'>{DUMMY_USER.followers.length}</p>
              <p className='text-slate-500 dark:text-white'>Followers</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-lg font-bold text-primary'>{DUMMY_USER.following.length}</p>
              <p className='text-slate-500 dark:text-white'>Following</p>
            </div>
          </div>
          <div className='mt-4 md:mt-0'>
            <Button type='button' onClick={followUser} label={loading ? <Spinner /> : 'Follow'} />
          </div>
        </div>
        <div className='w-full flex flex-col items-center mt-0 md:mt-8'>
          <p className='text-3xl font-bold text-primary'>{DUMMY_USER.fullName}</p>
          <p className='text-lg text-slate-400 italic'>@{DUMMY_USER.username}</p>
          <Link to={`/user/edit`} className='flex items-center gap-2 text-sm text-slate-500 dark:text-white my-3'><FiEdit3 /> Edit Profile</Link>
          <div className='flex flex-col items-center mt-6'>
            <p className='text-lg font-medium text-secondary flex items-center gap-2'>
              <FiMapPin className='text-dark text-sm' />
              {DUMMY_USER.location}
            </p>
            <p className='text-lg font-medium text-secondary flex items-center gap-2'>
              <FiBriefcase className='text-dark text-sm' />
              {DUMMY_USER.role} at {DUMMY_USER.company}
            </p>
          </div>
          <div className='flex items-center gap-4 mt-4'>
            <a href={DUMMY_USER.url} target='_blank' rel='noopener noreferrer' className='text-slate-500 dark:text-white text-2xl'><FiGlobe /></a>
            <a href={DUMMY_USER.github} target='_blank' rel='noopener noreferrer' className='text-slate-500 dark:text-white text-2xl'><FiGithub /></a>
            <a href={DUMMY_USER.linkedin} target='_blank' rel='noopener noreferrer' className='text-slate-500 dark:text-white text-2xl'><FiLinkedin /></a>
            <a href={DUMMY_USER.twitter} target='_blank' rel='noopener noreferrer' className='text-slate-500 dark:text-white text-2xl'><FiTwitter /></a>
          </div>
          <div className='w-full flex flex-col items-center border-t-thin border-slate-100 mt-12 pt-4'>
            <p className='w-4/5 md:w-2/3 text-center text-slate-500 dark:text-white'>{DUMMY_USER.bio}</p>
          </div>
          <div className='w-full flex items-center justify-center gap-4 mt-4'>
            <div onClick={() => switchTabs('posts')} className={`px-4 py-2 cursor-pointer ${activeTab.posts ? 'bg-slate-500 dark:bg-white text-white dark:text-slate-500' : 'bg-white dark:bg-slate-500 text-slate-500 dark:text-white'}`}>
              Posts
            </div>
            <div onClick={() => switchTabs('followers')} className={`px-4 py-2 cursor-pointer ${activeTab.followers ? 'bg-slate-500 dark:bg-white text-white dark:text-slate-500' : 'bg-white dark:bg-slate-500 text-slate-500 dark:text-white'}`}>
              Followers
            </div>
            <div onClick={() => switchTabs('following')} className={`px-4 py-2 cursor-pointer ${activeTab.following ? 'bg-slate-500 dark:bg-white text-white dark:text-slate-500' : 'bg-white dark:bg-slate-500 text-slate-500 dark:text-white'}`}>
              Following
            </div>
          </div>
          <div className='w-full px-3 py-1 border-t-thin border-slate-100'>
            {activeTab.posts && <div>Posts</div>}
            {activeTab.followers && <div>Followers</div>}
            {activeTab.following && <div>Following</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile