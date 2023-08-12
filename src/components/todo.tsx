import DTOTodo from '../models/TypeTodo'
import { EditTodoButton } from './buttons/EditTodoButton'
import DeleteButton from "./buttons/DeleteTodoButton"
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import zIndex from '@mui/material/styles/zIndex';
import { convertToDBTodo, convertToDTOTodo } from '../models/TypeTodo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteTodoFetch,updateTodoFetch } from '../fetches/todosFetches';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//@ts-ignore
import cookie from 'react-cookies'
import { loginFetch } from '../fetches/userFetches';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './TodoForm';
export default function TodoControl({ todo, setTodo, currentTime }: { currentTime: DateTime, todo: DTOTodo, setTodo: (todo: DTOTodo | null) => void }) {

    const [showModal, setShowModal] = useState(false);

    const [contentError, setContentError] = useState(false)

    const [_todo, _setTodo] = useState<DTOTodo>(todo)

    useEffect(() => {
        _setTodo(todo)
    }, [todo])

    return <>
        <div className={`todoContainer ${true ? "errorClass" : "normalClass"} other other other`} style={{ // change class based on date
            backgroundColor: (DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).diff(currentTime).milliseconds < 1000 * 3600 * 24) ? '#FF6865' : '#90EE90',
            opacity: todo?.completed ? 0.2 : (todo.dueDate == null ? 0.7 : 1),
        }}>



            <button
                onClick={() => setShowModal(true)}
                style={{
                    backgroundColor: '#00000000',
                    cursor: 'pointer',
                    color: 'white',
                    border: 'none',
                    borderRadius: 10,
                    padding: "0px",
                    margin: "0px 10px",

                }}>
                <img alt="edit icon" src="/edit-2.svg" width={25} height={25} />
            </button>

            <div className="nameContent">
                <h3>{todo.title}</h3>

                <p style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    wordWrap: 'break-word',
                }}>{todo.content}</p>

                {todo?.dueDate && DateTime.fromISO(todo?.dueDate?.toString()).toFormat('dd/MM/yyyy HH:mm')}

            </div>
            <input type="checkbox"
                //disabled={todo.dueDate == null}
                style={{
                    width: 30,
                    height: 30,
                }} checked={todo.completed} onChange={(e) => {

                    const newTodo = {
                        ...todo,
                        completed: e.target.checked
                    }

                    updateTodoFetch(newTodo, setTodo,setShowModal)  
                }} />
            <DeleteButton deleteTodo={async () => {
                deleteTodoFetch(todo, setTodo)
            }} />

        </div>
        <ToastContainer />

        {
            showModal &&
            <TodoForm action='save!' submit={setTodo} initial={todo} showModal ={showModal} setShowModal={setShowModal} />
        }

    </>
}