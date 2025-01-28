import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../features/BookSlice'

const SearchBar: React.FC = () => {
    const dispatch = useDispatch()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value))
    }

  return (
    <div>
        <input
            type='text'
            placeholder='Search books...'
            onChange={handleSearch}

        />
    </div>
  )
}

export default SearchBar