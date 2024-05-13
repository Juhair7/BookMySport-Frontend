import { configureStore } from '@reduxjs/toolkit'
import UserRegSlice from './slices/UserRegSlice'
import EmailStoreSlice from './slices/EmailStoreSlice'
import NavbarStateSlice from './slices/NavbarStateSlice'
import GetArenaDetails from './slices/GetArenaDetails'
import GetArenaImagesSlice from './slices/GetArenaImagesSlice'
import FetchSportsSlice from './slices/FetchSportsSlice'
import SetRenderAfterReshedule from './slices/SetRenderAfterReshedule'

export const store = configureStore({
  reducer: {
    userReg: UserRegSlice,
    email: EmailStoreSlice,
    navbar: NavbarStateSlice,
    arenaDetails: GetArenaDetails,
    arenaImages: GetArenaImagesSlice,
    fetchSports: FetchSportsSlice,
    renderBookingComponent: SetRenderAfterReshedule
  },
})