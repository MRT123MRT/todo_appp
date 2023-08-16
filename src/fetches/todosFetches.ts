import { toast } from 'react-toastify';
import cookie from 'react-cookies';
import { DateTime } from 'luxon';
import {BASEURL} from '../serverPath'
import DTOTodo, { HydrateDTOTodo } from '../models/TypeTodo';
const checktoken = ()=>
{
    if (cookie.load('token') === null || cookie.load('token') === undefined) { // PUT THIS IN A FUNCTION
        window.location.href = '/login'
    }
}



export const fetchTodos = (setTodos: (todos: DTOTodo[]) => void, todos: DTOTodo[]) => {


    checktoken();

    fetch(`${BASEURL}/todo`, { 
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
            setTodos((json as DTOTodo[]).map(HydrateDTOTodo))

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
    // const BASEURL = 'http://localhost:5000' // SAVE THIS IN A DIFFRENT FILE, CALL THIS IN EVERY PLACE NECESARY
    fetch(`${BASEURL}/todo/`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      credentials: 'include',
      body: JSON.stringify({ todo: todo })

    }).then(async res => {

      if (res.status >= 200 && res.status < 300) {

        const json = await res.json()
        console.log(json, json)
        toast("todo added")
        setTodos([...todos, HydrateDTOTodo(json)])
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

    fetch(`${BASEURL}/todo/${todo.id}`, {
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
        fetch(`${BASEURL}/todo/${newTodo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
        body: JSON.stringify({ todo: HydrateDTOTodo(newTodo) })

    }).then(async res => {
        console.log(newTodo.id)
        if (res.status >= 200 && res.status < 350) {
            setTodo(await res.json())
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