import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const url = import.meta.env.VITE_URL

const initialState = {
    posts: [],
    isLoading: false,
    error: null,
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

export const { clearFetchError } = postSlice.actions
export default postSlice.reducer