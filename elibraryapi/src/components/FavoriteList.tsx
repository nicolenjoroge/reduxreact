import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { removeFavorite } from '../features/BookSlice'

const FavoriteList: React.FC = () => {

    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.books.favorites)

    const handleRemoveFavorites = (id: string) => {
        dispatch(removeFavorite(id))
    }

  return (
    <div>
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
            <p>No favorites</p>           
        ) : (
            <ul>
                {favorites.map(book => (
                    <li key={book.id}>
                        <p>{book.title} by {book.author}</p>
                        <button onClick={() => handleRemoveFavorites(book.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default FavoriteList