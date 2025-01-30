import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Food {
    id: number,
    name: string,
    ingredients: string[],
    instructions: string[],
    image: string,
}

interface FoodState {
    food: Food[],
    favorites: Food[],
    search: string,
    status: 'loading' | 'idle' | 'failed',
}

const initialState: FoodState = {
    food: [],
    favorites: [],
    search: '',
    status: 'idle'
}

//Fetching

export const fetchRecipes = createAsyncThunk('food/fetchRecipes', async() => {
        const response = await axios.get('https://dummyjson.com/recipes')
        return response.data.recipes.map((recipe: { id: any; name: any; ingredients: any; instructions: any; image: any; }) => ({
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            image: recipe.image,
}))
})

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Food>) =>{
            const existingRecipe = state.favorites.find(food => food.id === action.payload.id)
            if (existingRecipe) {
                alert('Already a favorite!')
            } else {
                state.favorites.push(action.payload)
            }
        },
        removeRecipe: (state, action:PayloadAction<number>) => {
            state.favorites = state.favorites.filter(favorite => favorite.id != action.payload)
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = 'idle'
                state.food = action.payload
            })
            .addCase(fetchRecipes.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const { addRecipe, removeRecipe, setSearch } = foodSlice.actions
export default foodSlice.reducer