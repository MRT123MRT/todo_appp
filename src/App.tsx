import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import TodoControl from "./components/todo"
import DTOTodo from "./models/TypeTodo"
import SearchFilter from "./models/SearchFilter"
import { convertToDBTodo, convertToDTOTodo } from "./models/TypeTodo"

import './App.css'
import { DateTime } from "luxon"

export default function App() {

  //use state tells React that this variable is used during render and should be watched for changes (to rerender things)
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


  useEffect(() => {



    fetch('http://localhost:5000/fetchTodos', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(async res => {

      if (res.status === 200) {

        const json = await res.json();
        console.log(json)
        setTodos(json.map((a: any) => convertToDTOTodo(a)))

      }
      else {
        setTodos([]);

      }


    }).catch(err => {
      console.log(err);

    })


  }, [])


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

      <SearchBar filter={filter} setFilter={setFilter} addTodo={async (todo) => {
        fetch('http://localhost:5000/addTodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          },
          credentials: 'include',
          body: JSON.stringify({ todo: convertToDBTodo(todo) })

        }).then(async res => {

          if (res.status >= 200 && res.status < 300) {

            const json = await res.json()
            console.log(json, convertToDTOTodo(json))

            setTodos([...todos, convertToDTOTodo(json)])
          }
          else {
            console.log(await res.json())
            alert('something went wrong')
          }
        }).catch(err => {
          console.log(err);
          alert('we have some problems with server')

        })
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
            return <TodoControl key={i} todo={t} currentTime={currentTime} setTodo={(todo) => {
              if (todo !== null) {

                //fetch (/updateTodo)

                const newTodos = [...todos]
                newTodos[newTodos.findIndex(s => s.id === todo.id)] = todo
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