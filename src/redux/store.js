import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from './userSlice';
import empSliceReducer from './empSlice';

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        empList: empSliceReducer
    }
})

export default store;
