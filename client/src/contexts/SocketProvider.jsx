import { createContext, useContext, useState } from 'react'
import socketio from 'socket.io-client'

const socketURL = import.meta.env.VITE_URL

const socket = socketio(socketURL)
const SocketContext = createContext()

export const SocketProvider = ({children}) => {

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = useContext(SocketContext)