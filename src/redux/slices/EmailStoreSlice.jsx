import { createSlice } from '@reduxjs/toolkit';

export const setEmail = (email) => {
    return {
        type: 'emailStoreSlice/setEmail',
        payload: email
    };
};

const emailStoreSlice = createSlice({
    name: "emailStoreSlice",
    initialState: {
        data: null
    },
    reducers: {
        setEmail: (state, action) => {
            state.data = action.payload
        }
    }
})

export default emailStoreSlice.reducer
