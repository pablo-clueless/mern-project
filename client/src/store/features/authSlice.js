import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const userId = cookies.get('userId')
const url = ''

const initialState = {
    user: {},
    isLoggedIn: false,
}

export const getUserDetails = createAsyncThunk('auth/signin', async(_, thunkAPI) => {
    try {
        const response = await fetch(``)
        const data = await response.json()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.user = {}
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer