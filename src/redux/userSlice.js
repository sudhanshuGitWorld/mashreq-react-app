import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        data: {}
    },
    reducers: {
        getUser: (state, { payload }) => {
            state.data = payload;
        },
        removeUser: (state, { payload }) => {
            state.data = payload;
        }
    }
})

export const { getUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
