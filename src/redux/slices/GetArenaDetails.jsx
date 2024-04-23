import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiConfig } from '../../Constants/ApiConfig'

export const getArenaDetailsMethod = createAsyncThunk('getArenaDetails', async (spId, thunkAPI) => {

    try {
        const headers = {
            "Content-Type": "application/json",
            "spId": spId
        }
        const response = await axios.get(`${apiConfig.auth}/getdetailsbyspid`, { headers })

        const data = await response.data
        return data

    } catch (error) {
        toast.error('Something went wrong. Try again', {
            duration: 3000,
            position: 'top-right'
        });
    }
})

const getArenaDetailsSlice = createSlice({
    name: "getArenaDetailsSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArenaDetailsMethod.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArenaDetailsMethod.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getArenaDetailsMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default getArenaDetailsSlice.reducer
