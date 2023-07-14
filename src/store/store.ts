import { accountSlice } from './accountSlice';
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        accountData: accountSlice.reducer,
    },
})