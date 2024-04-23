import { configureStore } from '@reduxjs/toolkit'
import UserRegSlice from './slices/UserRegSlice'
import EmailStoreSlice from './slices/EmailStoreSlice'
import NavbarStateSlice from './slices/NavbarStateSlice'
import GetArenaDetails from './slices/GetArenaDetails'
import GetArenaImagesSlice from './slices/GetArenaImagesSlice'

export const store = configureStore({
  reducer: {
    userReg:UserRegSlice,
    email:EmailStoreSlice,
    navbar:NavbarStateSlice,
    arenaDetails:GetArenaDetails,
    arenaImages:GetArenaImagesSlice
  },
})