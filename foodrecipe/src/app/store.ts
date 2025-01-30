import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "../slices/FoodSlice"

export const store = configureStore({
    reducer: {
        food: foodReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
