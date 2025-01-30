import './App.css'
import RecipeList from './components/RecipeList'
import SavedRecipe from './components/SavedRecipe'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
      <SearchBar />
      <SavedRecipe />
      <RecipeList />
    </>
  )
}

export default App
