import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Books {
    id: number,
    title: string,
    rating: number,
}

interface BookState {
    books: Books[],
}

const initialState: BookState = {
    books: []
}

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Books>) => {
            const existingBooks = state.books.find(book => book.id === action.payload.id)
            if (existingBooks) {
                alert("Already added to the list!")
            } else {
                state.books.push(action.payload)
            }
        },
        removeBook: (state, action:PayloadAction<number>) => {
            state.books = state.books.filter(book => book.id != action.payload)
        }
    },
})

export default bookSlice.reducer
export const {addBook, removeBook} = bookSlice.actions