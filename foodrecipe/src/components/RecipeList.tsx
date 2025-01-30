import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { addRecipe, fetchRecipes, Food } from '../slices/FoodSlice'

const RecipeList: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {food, search, status } = useSelector((state: RootState) => state.food)

    const handleAddToFavorites = (food: Food) => {
        dispatch(addRecipe(food))
    }

    const filterRecipes = food.filter( f => (
        // check search by ingredient
        f.ingredients.map(i => (
            i.toLowerCase()
        )).includes(search.toLowerCase()) ||
        f.name.toLowerCase().includes(search.toLowerCase())
    )
    )

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [dispatch])

    if (status === 'loading') {
        return <p>Loading...</p>
    }
    if (status === 'failed') {
        return <p>Failed!</p>
    }
    return (
        <div>
            {/* Please remember to add image too */}
            <h2>Recipe Lists</h2>
            <ul>
                {filterRecipes.map(f => (
                    <li key={f.id} style={{listStyleType: 'none'}}>
                        <h3>{f.name}</h3>
                        <p>{f.ingredients}</p>
                        <p>{f.instructions}</p>
                        <button onClick={() => handleAddToFavorites(f)}>Save</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeList