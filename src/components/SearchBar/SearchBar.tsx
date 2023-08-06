import AdvancedSearchOptions from "./AdvancedSearchOptions"
import { AddTodoButton } from "../buttons/AddTodoButton"
import SearchFilter from "../../models/SearchFilter"
import DTOTodo from "../../models/TypeTodo"
import LogoutButton from "../../components/buttons/logoutButton"
import cookie from 'react-cookies'
const logout = () => {
  cookie.remove('token')
  window.location.href = "/login"
}
export default function SearchBar({ filter, setFilter, addTodo }: { filter: SearchFilter, setFilter: (filter: SearchFilter) => void, addTodo: (todo: DTOTodo) => void, }) {

  return <>
    <div style={{
      margin: '10px 0px',
      width: "90%",
      maxWidth: 800,
      display: 'flex',
    }}>
      <button
        onClick={() => {
          setFilter({
            ...filter,
            filteringEnabled: !filter.filteringEnabled
          })
        }}
        style={{
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: 10,
          padding: "7px 14px",
          marginRight: 10,
        }}>
        <img alt="add icon" src="/sliders.svg" width={25} height={25} />
      </button>
      <input type="text" placeholder="Search..."
        onChange={(e) => {
          setFilter({
            ...filter,
            generalSearch: e.target.value
          })
        }
        }
        value={filter.generalSearch}
        style={{
          flex: 1,
          minWidth: 40,
          fontSize: "1.2rem",
          border: '1px solid #bbb',
          borderRadius: 10,
          outline: 'none',
          padding: "12px 18px",
        }}
      />
      <AddTodoButton addTodo={addTodo} />
      <LogoutButton logout={logout}></LogoutButton>
    </div>

    {
      filter.filteringEnabled && <AdvancedSearchOptions filter={filter} setFilter={setFilter} />
    }
  </>

}