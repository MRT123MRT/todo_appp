import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar/SearchBar"
import TodoControl from "../components/todo"
import DTOTodo from "../models/TypeTodo"
import SearchFilter from "../models/SearchFilter"
import cookie from 'react-cookies'
// import App.css
import '../App.css';
import { DateTime } from "luxon"
import { fetchTodos, addTodoFetch } from "../fetches/todosFetches"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from "../components/buttons/logoutButton"



const setTodo = (todo: DTOTodo | null, todos: DTOTodo[], setTodos: any, t: DTOTodo) => {
  if (todo !== null) {
    const newTodos = [...todos]
    newTodos[newTodos.findIndex(s => s.id === todo.id)] = todo 
    setTodos(newTodos)
  }
  else {
    const newTodos = [...todos]
    newTodos.splice(newTodos.findIndex(s => s.id === t.id), 1)
    setTodos(newTodos)
  }
}


export default function App() {
  const [todos, setTodos] = useState<DTOTodo[]>([])
  const [currentTime, setCurrentTime] = useState(DateTime.now())

  // UPDATE TIME IN STATE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now())
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => { fetchTodos(setTodos, todos) }, [])

  const [filter, setFilter] = useState<SearchFilter>({
    generalSearch: "",
    filter: 'all',
    filteringEnabled: false,
  })

  const [filteredTodos, setFilteredTodos] = useState<DTOTodo[]>([])

  useEffect(() => {

    setFilteredTodos(
      todos
        .filter(a => {
          return !filter.generalSearch ||
            a.title
              .toLowerCase()
              .includes(filter.generalSearch.toLowerCase())
            ||
            a.content
              .toLowerCase()
              .includes(filter.generalSearch.toLowerCase())
        })
        .filter(a => {
          return !filter.filteringEnabled ||
            filter.filter === 'all' ? true : a.completed === (filter.filter === 'completed')
        })
        .sort((a, b) => { return (a.completed ? 1 : 0) - (b.completed ? 1 : 0) }))

  }, [filter, todos])


  return (
    <div className="container">
      <h1>
        My todo list
      </h1>
      <SearchBar filter={filter} setFilter={setFilter} addTodo={(todo: DTOTodo) => addTodoFetch(todo, setTodos, todos)} />
      <ToastContainer 
      autoClose={500}
      />
      <div className="tdffilter" >

        {

          filteredTodos.length > 0 ? filteredTodos.map((t, i) => {
            return <TodoControl
              key={i} todo={t}
              currentTime={currentTime}
              setTodo={(newTodo) => setTodo(newTodo, todos, setTodos, t)}
            />
          }) :
            <div className="nothing-here"

            >
              <img alt="add icon" src="/empty.svg" width={250} height={250} />
              Looks like nothing is here
            </div>
        }
      </div>

    </div>
  )
}