import { configureStore } from '@reduxjs/toolkit'
import GoogleSlice from './slices/GoogleSlice'
import UserRegSlice from './slices/UserRegSlice'

export const store = configureStore({
  reducer: {
    google:GoogleSlice,
    userReg:UserRegSlice
  },
})