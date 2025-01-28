import './App.css'
import BookList from './components/BookList'
import FavoriteList from './components/FavoriteList'
import GenreFilter from './components/GenreFilter'
import Pagination from './components/Pagination'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
    <h1>E library</h1>
    <SearchBar />
    <GenreFilter />
      <BookList />
      <Pagination />
      <FavoriteList />
    </>
  )
}

export default App
