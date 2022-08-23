import { createContext, useContext, useState } from 'react'

import { saveToLocalStorage } from '../libs'

const StateContext = createContext()

const initialState = { notifications: false, profile: false }

export const ContextProvider = ({children}) => {
    const [currentMode, setCurrentMode] = useState('Light')
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(undefined)
    const [isClicked, setIsClicked] = useState(initialState)

    const setMode = (mode) => {
        setCurrentMode(mode)
        saveToLocalStorage('mode', mode)
    }

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]: true})
    }

    const handleUnclick = (clicked) => {
        setIsClicked({...initialState, [clicked]: false})
    }

    return (
        <StateContext.Provider value={{activeMenu, setActiveMenu, currentMode, setMode, screenSize, setScreenSize, isClicked, handleClick, handleUnclick}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)