import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { removeRecipe } from '../slices/FoodSlice'

const SavedRecipe: React.FC = () => {
    const dispatch = useDispatch()
    const saved = useSelector((state: RootState) => state.food.favorites)

    const handleRemoveRecipe = (id: number) => {
        dispatch(removeRecipe(id))
    }

  return (
    <div>
        <h2>Saved Recipes</h2>
        <ul>
            {saved.map(s => (
                <li key={s.id}>
                    <p>{s.name}</p>
                    <img src={s.image} alt={s.name} width="150px" height="150px"/>
                    <button onClick={() => handleRemoveRecipe(s.id)}>Remove</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default SavedRecipe