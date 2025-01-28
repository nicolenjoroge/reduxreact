import React from 'react'
import { addBook, Books } from '../features/BookSlice'
import { useDispatch } from 'react-redux'

const books: Books[] = [
    {id: 1, title: 'Humans Bow Down', rating: 5},
    {id: 2, title: 'Carve The Mark', rating: 4},
    {id: 3, title: 'Three Women Disappear', rating: 4}
]

const BookList:React.FC = () => {

    const dispatch = useDispatch()

    const handleAddBook = (book: Books) => {
        dispatch(addBook(book))
    }

  return (
    <div>
        <h2>Book List</h2>
        {books.map(book => (
            <ul>
                <li key={book.id} style={{listStyleType: 'none'}}>{book.title} : {book.rating}</li>
                <button onClick={() => handleAddBook(book)}>Add To Favorites</button>
            </ul>
        ))}
    </div>
  )
}

export default BookList