import { createContext, useContext, useState } from 'react'

import { saveToLocalStorage } from '../libs'

const StateContext = createContext()

const initialState = {}

export const ContextProvider = ({children}) => {
    const [currentMode, setCurrentMode] = useState('Light')
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(undefined)

    const setMode = (mode) => {
        setCurrentMode(mode)
        saveToLocalStorage('mode', mode)
    }

    return (
        <StateContext.Provider value={{activeMenu, setActiveMenu, currentMode, setMode, screenSize, setScreenSize}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)