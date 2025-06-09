import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice.js'
import postSliceReducer from './Slices/PostSlice.js'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        posts: postSliceReducer
    },
    devTools: true
})

export default store;