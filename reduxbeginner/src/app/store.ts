import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../components/products.slice.ts'

export const store = configureStore({
    reducer: {
        products: productReducer
    },
})

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch