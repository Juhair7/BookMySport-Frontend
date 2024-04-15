import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const userRegMethod = createAsyncThunk('userReg', async (userData, thunkAPI) => {

    try {
        const headers = {
            "Content-Type": "application/json",
            "role": Cookies.get("role")
        }
        const response = await axios.post('api/adduser', {
            userName: userData.userName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            password: userData.password
        }, { headers })

        const data = await response.data
        return data

    } catch (error) {
        toast.error('Something went wrong. Try again', {
            duration: 3000,
            position: 'top-right'
        });
    }
})

const userRegSlice = createSlice({
    name: "userRegSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegMethod.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegMethod.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(userRegMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default userRegSlice.reducer

