import { configureStore } from '@reduxjs/toolkit'
import UserRegSlice from './slices/UserRegSlice'
import EmailStoreSlice from './slices/EmailStoreSlice'

export const store = configureStore({
  reducer: {
    userReg:UserRegSlice,
    email:EmailStoreSlice
  },
})