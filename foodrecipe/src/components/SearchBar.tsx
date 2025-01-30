import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../slices/FoodSlice'

const SearchBar: React.FC = () => {
    const dispatch = useDispatch()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value))
    }

  return (
    <div>
        <input placeholder='search...' type='text' onChange={handleSearchChange}/>
    </div>
  )
}

export default SearchBar