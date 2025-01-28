import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { setCurrentPage } from '../features/BookSlice'

const Pagination: React.FC = () => {

    const dispatch = useDispatch()
    const { currentPage, itemsPerPage, books } = useSelector((state: RootState) => state.books)

    const totalPages = Math.ceil(books.length / itemsPerPage)


  return (
    <div>
        {Array.from({length: totalPages}, (_, index) => (
            <button
                key={index + 1}
                onClick={() => dispatch(setCurrentPage(index + 1))}
                disabled={currentPage === index + 1}
            >
                {index + 1}
            </button>
        ))}
    </div>
  )
}

export default Pagination