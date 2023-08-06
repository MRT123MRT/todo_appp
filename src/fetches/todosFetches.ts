import { toast } from 'react-toastify';
import cookie from 'react-cookies';
import DTOTodo, { convertToDBTodo, convertToDTOTodo } from "../models/TypeTodo"
import { DateTime } from 'luxon';


export const fetchTodos = (setTodos: (todos: DTOTodo[]) => void, todos: DTOTodo[]) => {


    if (cookie.load('token') === null || cookie.load('token') === undefined) { // PUT THIS IN A FUNCTION
        window.location.href = '/login'
    }

    fetch('http://localhost:5000/fetchTodos', { //MOVE ALL HTTP REQUESTS INTO DIFFRENT FILES
        method: 'GET',
        credentials: 'include',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then(async res => {

        if (res.status === 200) {
            toast("task get from server successfully");
            const json = await res.json();
            console.log(json)
            setTodos(json.map((a: any) => convertToDTOTodo(a)))

        }
        else {
            setTodos([]);
            toast("no task found");
        }


    }).catch(err => {
        console.log(err);
        toast("we have some problems with server");
    })
}

export const addTodoFetch = async (todo: DTOTodo, setTodos: (todos: DTOTodo[]) => void, todos: DTOTodo[]) => {
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
        toast("todo added")
        setTodos([...todos, convertToDTOTodo(json)])
      }
      else {
        console.log(await res.json())
        toast("something went wrong")
      }
    }).catch(err => {
      console.log(err);
      toast("we have some problems")

    })}
export const deleteTodoFetch = async (todo: DTOTodo, setTodo: (todo: DTOTodo | null) => void) => {

    fetch(`http://localhost:5000/deleteTodo/${todo.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
        body: JSON.stringify({ todoid: todo.id })

    }).then(async res => {

        if (res.status >= 200 && res.status < 300) {

            setTodo(null)
            toast('todo deleted')
        }
        else {
            console.log(await res.json())
            toast('something went wrong')
        }
    }).catch(err => {
        console.log(err);
        toast('we have some problems with server')

    })
}

export const updateTodoFetch = async (newTodo: {
    title: string;
    content: string;
    completed: boolean;
    id: string;
    dueDate: DateTime | null;
    userid?: string | undefined;},
    setTodo: (todo: DTOTodo | null) => void,
    setShowModal: (showModal: boolean) => void
    
    ) => {
    fetch('http://localhost:5000/updateTodo', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
        body: JSON.stringify({ todo: convertToDBTodo(newTodo) })

    }).then(async res => {

        if (res.status >= 200 && res.status < 300) {
            setTodo(convertToDTOTodo(await res.json()))
            setShowModal(false);
            toast('todo updated')
        }
        else {
            console.log(await res.json())
            toast('something went wrong')
        }
    }).catch(err => {
        console.log(err);
        toast('we have some problems with server')

    })




}