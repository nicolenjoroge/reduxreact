import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../app/store'
import { addFavorite, Books, fetchBooks } from '../features/BookSlice'

const BookList:React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { books, status, searchQuery, selectedGenre, currentPage, itemsPerPage } = useSelector((state: RootState) => state.books)

    

    const filterBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (searchQuery ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
        (selectedGenre === 'All')//book.genre === selectedGenre)
    )
    
    //Handle Pagination
    const startIndex = (currentPage - 1 ) * itemsPerPage
    const paginatedBooks = filterBooks.slice(startIndex, startIndex + itemsPerPage)

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    if (status === 'loading') {
        return <p>Loading books ...</p>
    }

    if (status === 'failed') {
        return <p>Failed to load books</p>
    }

    const handleAddToFavorites = (book: Books) => {
        dispatch(addFavorite(book))
    }
  return (
    <div>
        <h2>Book List</h2>
        <ul>
            {paginatedBooks.map(book => (
                <li key={book.id}>
                    <p>{book.title} by {book.author}</p>
                    <button onClick={() => handleAddToFavorites(book)}>Add to Favorites</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default BookList