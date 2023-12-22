import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "../feastures/userDetailSlice";
export const store = configureStore({
    reducer:{
        app: userDetailSlice,
    }
})
