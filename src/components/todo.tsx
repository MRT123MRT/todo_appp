import DTOTodo from '../models/TypeTodo'
//import { EditTodoButton } from './buttons/EditTodoButton'
import DeleteButton from "./buttons/DeleteTodoButton"
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import zIndex from '@mui/material/styles/zIndex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteTodoFetch, updateTodoFetch } from '../fetches/todosFetches';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//@ts-ignore
import cookie from 'react-cookies'
import { loginFetch } from '../fetches/userFetches';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './TodoForm';
import '../App.css'

type TodoControlProps = {
    currentTime: DateTime,
    todo: DTOTodo,
    setTodo: (todo: DTOTodo | null) => void
}



const TodoControl: React.FC<TodoControlProps> = ({ todo, setTodo, currentTime }) => {

    const [showModal, setShowModal] = useState(false);

    const [contentError, setContentError] = useState(false)

    const [_todo, _setTodo] = useState<DTOTodo>(todo)

    function updateTodo(e: any) {
        const newTodo = {
            ...todo,
            completed: e.target.checked
        }

        updateTodoFetch(newTodo, setTodo, setShowModal)

    }

    useEffect(() => {
        _setTodo(todo)
    }, [todo])

    return <>
        <div className={`
        todoContainer 
        ${(DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).diff(currentTime).milliseconds < 1000 * 3600 * 24) ? 'bg-red' : 'bg-green'}
        ${todo?.completed ? "opacity-20" : (todo.dueDate == null ? "opacity-70" : "")}
        `}
        //  style={{ // change class based on date
        //     backgroundColor: (DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).diff(currentTime).milliseconds < 1000 * 3600 * 24) ? '#FF6865' : '#90EE90',
        //     opacity: todo?.completed ? "opacity-20" : (todo.dueDate == null ? "opacity-70" : 1),
        // }}
        >



            <button className='EditButton'
                onClick={() => setShowModal(true)}
            >
                <img alt="edit icon" src="/edit-2.svg" width={25} height={25} />
            </button>

            <div className="nameContent">
                <h3>{todo.title}</h3>

                <p className='pstyle'>{todo.content}</p>

                {todo?.dueDate && DateTime.fromISO(todo?.dueDate?.toString()).toFormat('dd/MM/yyyy HH:mm')}

            </div>
            <input type="checkbox" className="checkbox"

                checked={todo.completed} onChange={(e) => { updateTodo(e) }} />
            <DeleteButton deleteTodo={async () => {
                deleteTodoFetch(todo, setTodo)
            }} />

        </div>
        <ToastContainer />

        {
            showModal &&
            <TodoForm action='save!' submit={async (t) => updateTodoFetch(t, setTodo, setShowModal)} initial={todo} showModal={showModal} setShowModal={setShowModal} />
        }

    </>
}

export default TodoControl