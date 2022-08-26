import React from 'react'

const Home  = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))
const Signup = React.lazy(() => import('./Signup'))
const Profile = React.lazy(() => import('./Profile'))
const PasswordReset = React.lazy(() => import('./PasswordReset'))
const PostById = React.lazy(() => import('./PostById'))
const Settings = React.lazy(() => import('./Settings'))

export { Home, Login, Signup, Profile, PasswordReset, PostById, Settings }