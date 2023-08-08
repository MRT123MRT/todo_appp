import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar/SearchBar"
import TodoControl from "../components/todo"
import DTOTodo from "../models/TypeTodo"
import SearchFilter from "../models/SearchFilter"
import { convertToDBTodo, convertToDTOTodo } from "../models/TypeTodo"
import cookie from 'react-cookies'
// import App.css
import '../App.css';
import { DateTime } from "luxon"
import { fetchTodos, addTodoFetch } from "../fetches/todosFetches"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from "../components/buttons/logoutButton"


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
      <ToastContainer />
      <div style={{
        width: "90%",
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        flex: 1,
        maxWidth: 800,
        height: "90%",
        backgroundColor: 'white',
        border: '1px solid #bbb',
        borderRadius: 10,
        margin: '10px 0px',
      }}>

        {

          filteredTodos.length > 0 ? filteredTodos.map((t, i) => {
            return <TodoControl key={i} todo={t} currentTime={currentTime} setTodo={(todo) => {
              if (todo !== null) {
                const newTodos = [...todos]
                newTodos[newTodos.findIndex(s => s.id === todo.id)] = todo //this should be declared in other place
                setTodos(newTodos)
              }
              else {
                const newTodos = [...todos]
                newTodos.splice(newTodos.findIndex(s => s.id === t.id), 1)
                setTodos(newTodos)
              }
            }} />
          }) :
            <div
              style={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                fontSize: "1.8rem",
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img alt="add icon" src="/empty.svg" width={250} height={250} />
              Looks like nothing is here
            </div>
        }
      </div>

    </div>
  )
}