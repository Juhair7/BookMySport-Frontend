import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const spRegMethod = createAsyncThunk('spReg', async (spData, thunkAPI) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "role": Cookies.get("role")
        }

        const response = await axios.post(`${apiConfig.auth}/adduser`, {
            userName: spData.userName,
            email: spData.email,
            phoneNumber: spData.phoneNumber,
            password: spData.password,
            address: spData.address,
            centreName: spData.centreName,
            startTime: spData.startTime,
            stopTime: spData.stopTime
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

const spRegSlice = createSlice({
    name: "spRegSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(spRegMethod.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(spRegMethod.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(spRegMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default spRegSlice.reducer