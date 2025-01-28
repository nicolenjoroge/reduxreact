import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { removeBook } from '../features/BookSlice'

const Favorite: React.FC = () => {
    const books = useSelector((state: RootState) => state.books.books)
    const dispatch = useDispatch()

    const handleRemoveBook = (id: number) => {
        dispatch(removeBook(id))
    }

    return (
        <div>
            <h2>Favorites List</h2>
            {books.length === 0 ? (
                <h2>No favorites</h2>
            ) : (
                <ul>
                    {books.map(book => (
                    <li key={book.id} style={{listStyleType: 'none'}}>
                        <p>{book.title}</p>
                        <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Favorite