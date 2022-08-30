import { createSlice } from '@reduxjs/toolkit'

import { removeFromLocalStorage, saveToLocalStorage } from '../../libs'

const initialState = {
    user: {},
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload
            saveToLocalStorage('user', state.user)
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.user = {}
            removeFromLocalStorage('user')
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer