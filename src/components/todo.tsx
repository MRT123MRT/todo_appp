import Todo from '../models/Todo'
import { EditTodoButton } from './buttons/EditTodoButton'
import DeleteButton from "./buttons/DeleteTodoButton"
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import lottieDone from '../done.json'
import Lottie from "lottie-react";

export default function TodoControl({ todo, setTodo, currentTime }: { currentTime: DateTime, todo: Todo, setTodo: (todo: Todo | null) => void }) {


    useEffect(() => {
        console.log(DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).diff(currentTime).milliseconds, currentTime)
    }, [currentTime])

    return <div className="todoContainer" style={{
        backgroundColor: (DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).diff(currentTime).milliseconds < 1000 * 3600 * 24) ? '#FF6865' : '#90EE90',
    }}>

        <EditTodoButton todo={todo} updateTodo={setTodo} />

        <div className="nameContent">
            <h3>{todo.title}</h3>

            <p style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
            }}>{todo.content}</p>

            {todo?.dueDate && DateTime.fromISO(todo?.dueDate?.toString()).toFormat('dd/MM/yyyy HH:mm')}

        </div>

        <input type="checkbox" style={{
            width: 30,
            height: 30,
        }} checked={todo.completed} onChange={(e) => {
            setTodo({
                ...todo,
                completed: e.target.checked
            })
        }} />



        <DeleteButton deleteTodo={() => { setTodo(null) }} />




        {/* <DeleteButton todoId={todo.id} deleteTodo={deleteTodo} /> */}




    </div>
}