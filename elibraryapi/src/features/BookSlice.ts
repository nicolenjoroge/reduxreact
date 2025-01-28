import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Books {
    id: string,
    title: string,
    author: string
}

interface BookState {
    books: Books[],
    favorites: Books[],
    status: 'idle' | 'loading' | 'failed'
    searchQuery: string, //For search feature
    selectedGenre: string, //For filter by genre feature
    currentPage: number,
    itemsPerPage: number
}

const initialState: BookState = {
    books: [],
    favorites: [],
    status: 'idle',
    searchQuery: '',
    selectedGenre: 'All',
    currentPage: 1,
    itemsPerPage: 5
}

//Async action to fetch the books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async() => {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=react')
    return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || 'Unknown Author'
    }))
})

const bookSlice = createSlice ({
    name: 'books',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Books>) => {
            if (!(state.favorites.find(book => book.id === action.payload.id))) {
                state.favorites.push(action.payload)
            } else {
                alert("Book is already a favorite!")
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(book => book.id != action.payload)
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload //Update the search
        },
        setGenre: (state, action: PayloadAction<string>) => {
            state.selectedGenre = action.payload //Update the selected genre
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'idle'
                state.books = action.payload
            })
            .addCase(fetchBooks.rejected, (state) => {
                state.status = 'failed'
            })      
    },
})

export default bookSlice.reducer
export const { setSearchQuery, addFavorite, removeFavorite, setGenre, setCurrentPage } = bookSlice.actions