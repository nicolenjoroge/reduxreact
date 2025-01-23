import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

export interface Product {
    title: string,
    price: number,
    id: string
}

export const initialState: Product[] = [
    {title: 'Escape from Tarkov', price: 60, id: 'eft'},
    {title: 'Hunt: Showdown', price: 70, id: 'hunt'},
    {title: 'Hell Let Loose', price: 55, id: 'hll'}
]

const productsSlice = createSlice({
    name: "products", 
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            return [action.payload, ...state]
        },
    },
})

export const { addProduct } = productsSlice.actions

export const getProductsSelector = (state: RootState) => state.products
export default productsSlice.reducer