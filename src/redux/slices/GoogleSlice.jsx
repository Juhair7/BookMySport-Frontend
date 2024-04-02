import { createSlice } from '@reduxjs/toolkit';

export const setEmail = (email) => {
    return {
        type: 'googleSlice/setEmail',
        payload: email
    };
};

const GoogleSlice = createSlice({
    name: "googleSlice",
    initialState: {
        data: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.data = action.payload
        }
    }
})


export default GoogleSlice.reducer