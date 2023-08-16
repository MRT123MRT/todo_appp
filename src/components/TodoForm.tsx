
import { useState } from 'react'
import DTOTodo from '../models/TypeTodo'
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import '../App.css'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type TodoFormProps = {
    submit: (todo: DTOTodo) => void,
    initial?: DTOTodo,
    action: string,
    showModal: boolean,
    setShowModal: (showModal: boolean) => void
}
const TodoForm: React.FC<TodoFormProps> = ({ initial, submit, action, showModal, setShowModal }) => {

    const [todo, setTodo] = useState<DTOTodo>(initial || {
        title: "",
        content: "",
        completed: false,
        id: v4(),
        dueDate: DateTime.fromJSDate(new Date())
    } as DTOTodo)

    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)
    const btnstyle = { margin: '8px 0' }

    const onClickSubmit = () => { // PUT ALL OF THIS IN FUNCTION 

        setTitleError(todo.title.length < 1)
        setContentError(todo.content.length < 1)

        if (todo.title.length * todo.content.length < 1) return;

        submit(todo);
        setShowModal(false);
        setTodo(
            {
                title: "",
                content: "",
                completed: false,
                createdAt: new Date(),
                id: v4(),
                dueDate: DateTime.fromJSDate(new Date()),
            } as DTOTodo // INCORRECT USAGE OF TYPES, AND ADDD FUNCTION FOR DEFAULT DTOTODO
        )
    }


    return (
        <>

            <div className="opacityBackground"
                onClick={() => setShowModal(false)}

            >

                <div className='modal'
                    onClick={(e) => e.stopPropagation()}

                >
                    <h3>Add a new Todo!</h3>
                    <input className='titlearea'
                        onFocus={() => setTitleError(false)}
                        onChange={(e) => setTodo({
                            ...todo,
                            title: e.target.value
                        })}
                        value={todo.title}
                        type="text" placeholder="Title"
                    />

                    <textarea
                        className='contentarea'
                        onFocus={() => setContentError(false)}
                        onChange={(e) => setTodo({
                            ...todo,
                            content: e.target.value
                        })}
                        value={todo.content}
                        placeholder="Description"
                    />

                    <div className='style' >


                        <DatePicker
                            timeIntervals={5}
                            showTimeSelect
                            disabled={todo.dueDate == null}
                            selected={DateTime.fromISO(todo?.dueDate?.toString() || new Date().toISOString()).toJSDate()}
                            onChange={(date) => setTodo({
                                ...todo,
                                dueDate: DateTime.fromJSDate(date as Date)
                            })}
                            dateFormat="MM-dd-yyyy, HH:mm"
                            timeFormat='HH:mm'
                        />

                        <div className='style ' >


                            <Checkbox
                                size='medium'
                                checked={todo.dueDate == null} onChange={(e) => {
                                    setTodo({
                                        ...todo,
                                        dueDate: todo.dueDate !== null ? null : DateTime.fromJSDate(new Date())
                                    })
                                }} />
                        </div>

                    </div>

                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        onClick={onClickSubmit}
                    >{action}</Button>
                    Your task is {todo.dueDate == null ? 'not' : ''} relevant
                </div>





            </div>

        </>
    )
}
export default TodoForm;