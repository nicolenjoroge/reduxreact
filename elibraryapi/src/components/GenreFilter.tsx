import React from 'react'
import { useDispatch } from 'react-redux'
import { setGenre } from '../features/BookSlice'

const genres = ['All', 'Fiction', 'Non-fiction', 'Technology', 'Science', 'History']

const GenreFilter: React.FC = () => {

    const dispatch = useDispatch()

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setGenre(e.target.value))
    }

  return (
    <div>
        <label htmlFor='genre'>Filter by Genre</label>
        <select id='genre' onChange={handleGenreChange}>
            {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
            ))}
        </select>
    </div>
  )
}

export default GenreFilter