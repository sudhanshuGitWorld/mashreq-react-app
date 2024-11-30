import { createSlice } from "@reduxjs/toolkit";

export const empSlice = createSlice({
    name: 'empSlice',
    initialState: {
        data: {},
        id: 0,
    },
    reducers: {
        addEmployee: (state, { payload }) => {
            state.data = payload;
        },
        updateEmployee: (state, { payload }) => {
            state.id = payload;
        },
        removeEmployee: (state, { payload }) => {
            state.data = payload;
        }
    }
})

export const { addEmployee, updateEmployee, removeEmployee } = empSlice.actions;
export default empSlice.reducer;
