
import { useState } from 'react'
import DTOTodo from '../../models/TypeTodo'
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';

import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export function AddTodoButton({ addTodo }: { addTodo: (todo: DTOTodo) => void }) {
    const [showModal, setShowModal] = useState(false)
    const [todo, setTodo] = useState<DTOTodo>({
        title: "",
        content: "",
        completed: false,
        id: v4(),
        dueDate: DateTime.fromJSDate(new Date())
    } as DTOTodo)

    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)
    const btnstyle = { margin: '8px 0' }
    return (
        <>
            <button 
                onClick={() => setShowModal(true)}
                style={{
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    color: 'white',
                    border: '1px solid #ccc',
                    borderRadius: 10,
                    padding: "8px 14px",
                    marginLeft: 10,
                    boxShadow: '0px 0px 5px #ccc',
                }}
                >
                <img alt="add icon" src="/file-plus.svg" width={25} height={25} />
            </button>

            {
                showModal &&

                <div className="opacityBackground"
                    onClick={() => setShowModal(false)}

                    // style={{
                    //     position: 'fixed',
                    //     top: 0,
                    //     left: 0,
                    //     width: '100vw',
                    //     height: '100vh',
                    //     backgroundColor: 'rgba(0,0,0,0.5)',
                    //     padding: '20px',
                    //     zIndex: 1000000000,
                    // }}
                    
                    >

                    <div 
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: 'fit-content',
                            height: 'fit-content',                          
                            backgroundColor: 'white',
                            borderRadius: 10,
                            margin: 'auto',
                            marginTop: 100,
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}
                        
                        >
                            <h3>Add a new Todo!</h3>
                        <input
                            onFocus={() => setTitleError(false)}
                            onChange={(e) => setTodo({
                                ...todo,
                                title: e.target.value
                            })}
                            value={todo.title}
                            type="text" placeholder="Title"
                            style={{
                                fontSize: "1.2rem",
                                border: !titleError ? '1px solid #bbb' : '1px solid red',
                                borderRadius: 10,
                                outline: 'none',
                                padding: "12px 18px",
                                width: '100%',
                                boxSizing: 'border-box',
                                margin: "0px 20px",

                            }}
                        />

                        <textarea
                            onFocus={() => setContentError(false)}
                            onChange={(e) => setTodo({
                                ...todo,
                                content: e.target.value
                            })}
                            value={todo.content}
                            placeholder="Description"
                            style={{
                                fontSize: "1.2rem",
                                border: !contentError ? '1px solid #bbb' : '1px solid red',
                                borderRadius: 10,
                                outline: 'none',
                                padding: "12px 18px",
                                width: '100%',
                                boxSizing: 'border-box',
                                margin: "10px 200px",
                                height: 280,
                            }}
                        />
                    
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>


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

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 'auto',
                            }}>


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
                            onClick={() => {

                                setTitleError(todo.title.length < 1)
                                setContentError(todo.content.length < 1)

                                if (todo.title.length * todo.content.length < 1) return;

                                addTodo(todo);
                                setShowModal(false);
                                setTodo(
                                    {
                                        title: "",
                                        content: "",
                                        completed: false,
                                        createdAt: new Date(),
                                        id: v4(),
                                        dueDate: DateTime.fromJSDate(new Date()),
                                    } as DTOTodo
                                )
                            }}
                        >Add todo</Button>
                        Your task is {todo.dueDate == null ? 'not' : ''} relevant
                    </div>





                </div>
            }
        </>
    )
}