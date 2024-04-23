import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiConfig } from '../../Constants/ApiConfig'

export const getArenaImagesMethod = createAsyncThunk('getArenaImages', async (spId, thunkAPI) => {

    try {
        const headers = {
            "Content-Type": "application/json",
            "spId": spId
        }
        const response = await axios.get(`${apiConfig.sp}/getimages`, { headers })

        const data = await response.data
        return data

    } catch (error) {
        toast.error('Something went wrong. Try again', {
            duration: 3000,
            position: 'top-right'
        });
    }
})

const getArenaImagesSlice = createSlice({
    name: "getArenaImagesSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArenaImagesMethod.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArenaImagesMethod.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getArenaImagesMethod.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default getArenaImagesSlice.reducer