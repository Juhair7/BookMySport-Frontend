import { createSlice } from '@reduxjs/toolkit';

export const setRenderConditionMethodAction = (state) => {
    return {
        type: 'setRenderAfterReshedule/setRenderConditionMethod',
        payload: state
    };
};

const setRenderAfterReshedule = createSlice({
    name: "setRenderAfterReshedule",
    initialState: {
        data: false
    },
    reducers: {
        setRenderConditionMethod: (state, action) => {
            return {
                ...state,
                data: action.payload
            };
        }
    }
});

export const { setRenderConditionMethod } = setRenderAfterReshedule.actions;

export default setRenderAfterReshedule.reducer;
