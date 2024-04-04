import { configureStore } from '@reduxjs/toolkit'
import UserRegSlice from './slices/UserRegSlice'

export const store = configureStore({
  reducer: {
    userReg:UserRegSlice
  },
})