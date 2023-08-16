import AdvancedSearchOptions from "./AdvancedSearchOptions"
import { AddTodoButton } from "../buttons/AddTodoButton"
import SearchFilter from "../../models/SearchFilter"
import DTOTodo from "../../models/TypeTodo"
import LogoutButton from "../../components/buttons/logoutButton"
import cookie from 'react-cookies'
import '../../App.css'

const logout = () => {
  cookie.remove('token')
  window.location.href = "/login"
}


type SearchBarProps = {
  filter: SearchFilter,
  setFilter: (filter: SearchFilter) => void,
  addTodo: (todo: DTOTodo) => void,
}



const SearchBar: React.FC<SearchBarProps> = ({ filter, setFilter, addTodo }) => {

  return <>
    <div className="search-bar">
      <button className="buttnSearcBar"
        onClick={() => {
          setFilter({
            ...filter,
            filteringEnabled: !filter.filteringEnabled
          })
        }}
  
        >
        <img alt="add icon" src="/sliders.svg" width={25} height={25} />
      </button>
      <input type="text" placeholder="Search..." className="inputSearchBar"
        onChange={(e) => {
          setFilter({
            ...filter,
            generalSearch: e.target.value
          })
        }
        }
        value={filter.generalSearch}

      />
      <AddTodoButton addTodo={addTodo} />
      <LogoutButton logout={logout}></LogoutButton>
    </div>

    {
      filter.filteringEnabled && <AdvancedSearchOptions filter={filter} setFilter={setFilter} />
    }
  </>

}

export default SearchBar