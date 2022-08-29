import React from 'react'

const Chat = React.lazy(() => import('./Chat'))
const ForgotPassword = React.lazy(() => import('./ForgotPassword'))
const Home  = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))
const PasswordReset = React.lazy(() => import('./PasswordReset'))
const Post = React.lazy(() => import('./Post'))
const PrivacyPolicy = React.lazy(() => import('./PrivacyPolicy'))
const Profile = React.lazy(() => import('./Profile'))
const Settings = React.lazy(() => import('./Settings'))
const Signup = React.lazy(() => import('./Signup'))

export { Chat, ForgotPassword, Home, Login, PasswordReset, Post, PrivacyPolicy, Profile, Settings, Signup }