import { createSlice } from '@reduxjs/toolkit';

export const setNavbarState = (navbarState) => {
    return {
        type: 'navbarStateSlice/setNavbarState',
        payload: navbarState
    };
};

const navbarStateSlice = createSlice({
    name: "navbarStateSlice",
    initialState:true,
    reducers: {
        setNavbarState: (state, action) => {
            return action.payload;
        }
    }
});

export default navbarStateSlice.reducer;
