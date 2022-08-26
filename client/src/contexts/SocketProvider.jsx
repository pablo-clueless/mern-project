import { createContext, useState } from 'react'
import socketio from 'socket.io-client'

const socketURL = import.meta.env.VITE_URL

const socket = socketio(socketURL)
export const SocketContext = createContext()

export const SocketProvider = ({children}) => {
    
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}