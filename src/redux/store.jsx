import { configureStore } from '@reduxjs/toolkit'
import UserRegSlice from './slices/UserRegSlice'
import EmailStoreSlice from './slices/EmailStoreSlice'
import NavbarStateSlice from './slices/NavbarStateSlice'

export const store = configureStore({
  reducer: {
    userReg:UserRegSlice,
    email:EmailStoreSlice,
    navbar:NavbarStateSlice
  },
})