import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import TodoControl from "./components/todo"
import Todo from "./models/Todo"
import SearchFilter from "./models/SearchFilter"

import './App.css'

export default function App() {

  //use state tells React that this variable is used during render and should be watched for changes (to rerender things)
  const [todos, setTodos] = useState<Todo[]>([])


  const[currentTime, setCurrentTime] = useState(Date.now())
 // UPDATE TIME IN STATE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  //runs once when the component shown on the screen
  useEffect(() => {

    //read data from localstorage
    const data = localStorage.getItem('todos')

    console.log(data);  

    //if data exists, convert it to an array and set it to todos
    if (data) {
      setTodos(JSON.parse(data))
      console.log(JSON.parse(data))
    }

  }, []) // [] means run once !! no array means run every time the component is shown on the screen (multiple times per second usually so be careful)


  //runs when todos changes
  useEffect(() => {
    //save todos to localstorage
    if (todos.length > 0)
      localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]) // [todos] means run when tehre is any change to 'todos' state


  const [filter, setFilter] = useState<SearchFilter>({
    generalSearch: "",
    filter: 'all',
    filteringEnabled: false,
  })

  return (
    <div className="container">
      <h1>
        My todo list
      </h1>

      <SearchBar filter={filter} setFilter={setFilter} addTodo={(todo) => {

        todo.id = todos.length.toString();

        setTodos([...todos, todo])

      }} />

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

          todos.filter(a => {
            if (filter.generalSearch)
              return a.title.toLowerCase().includes(filter.generalSearch.toLowerCase()) || a.content.toLowerCase().includes(filter.generalSearch.toLowerCase())
            else
              return true
          }).filter(a => {
            if (filter.filteringEnabled)
              return filter.filter === 'all' ? true : a.completed === (filter.filter === 'completed')
            else
              return true
          }).length > 0 ? todos.filter(a => {
            if (filter.generalSearch)
              return a.title.toLowerCase().includes(filter.generalSearch.toLowerCase()) || a.content.toLowerCase().includes(filter.generalSearch.toLowerCase())
            else
              return true
          }).filter(a => {
            if (filter.filteringEnabled)
              return filter.filter === 'all' ? true : a.completed === (filter.filter === 'completed')
            else
              return true
          }).sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0)).map((t, i) => {
            return <TodoControl key={i} todo={t} setTodo={(todo) => {
              const newTodos = [...todos]
              newTodos[parseInt(todo.id)] = todo
              setTodos(newTodos)
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