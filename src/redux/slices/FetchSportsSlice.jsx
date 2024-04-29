import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig'
import Cookies from 'js-cookie';

export const fetchSportsMethod = createAsyncThunk('getArenaDetails', async (thunkAPI) => {

    try {
        const headers = {
            "Content-Type": "application/json",
            "token": Cookies.get("token"),
            "role": Cookies.get("role")
        }

        const response = await axios.get(`${apiConfig.sp}/getsportsforsp`, { headers })

        const data = await response.data
        return data

    } catch (error) {
        toast.error('Something went wrong. Try again', {
            duration: 3000,
            position: 'top-right'
        });
    }
})

const fetchSportsSlice = createSlice({
    name: "fetchSportsSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSportsMethod.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSportsMethod.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSportsMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default fetchSportsSlice.reducer

