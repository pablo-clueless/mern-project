import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { saveToLocalStorage } from '../../libs'

const url = import.meta.env.VITE_URL

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
    isLiked: [],
}

export const getAllPosts = createAsyncThunk('/getAll', async(_, thunkAPI) => {
    try {
        const response = await fetch(`${url}/post/get`)
        const data = await response.json()
        return data.posts
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearFetchError: (state) => {
            state.error = null
        },
        addToLike: (state, action) => {
            const id = action.payload
            let isInLiked = state.isLiked.find(liked => liked === id)
            if(!isInLiked) {
                state.isLiked.push(id)
                saveToLocalStorage('isLiked', state.isLiked)
            } else return
        },
        removeFromLike: (state, action) => {
            const id = action.payload
            state.isLiked = state.isLiked.filter(liked => liked !== id)
            saveToLocalStorage('isLiked', state.isLiked)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = action.payload
        }),
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const { clearFetchError, addToLike, removeFromLike } = postSlice.actions
export default postSlice.reducer