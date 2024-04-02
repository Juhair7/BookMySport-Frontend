import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const userRegMethod = createAsyncThunk('userReg', async (userData, thunkAPI) => {

    try {
        const headers = {
            "Content-Type": "application/json",
            "role": Cookies.get("role")
        }
        const response = await axios.post('http://localhost:8090/api/adduser', {
            userName: userData.userName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            password: userData.password
        }, { headers })

        const data = await response.data
        Cookies.set("token",data.token)
        return data
    } catch (error) {
        console.log(error)
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

