import React from 'react'

const Home  = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))
const Signup = React.lazy(() => import('./Signup'))
const Profile = React.lazy(() => import('./Profile'))
const PasswordReset = React.lazy(() => import('./PasswordReset'))
const EditUser = React.lazy(() => import('./EditUser'))
const PostById = React.lazy(() => import('./PostById'))

export { Home, Login, Signup, Profile, PasswordReset, EditUser, PostById }