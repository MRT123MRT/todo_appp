import DTOTodo from '../models/TypeTodo'
import { EditTodoButton } from './buttons/EditTodoButton'
import DeleteButton from "./buttons/DeleteTodoButton"
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';
import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import lottieDone from '../done.json'
import Lottie from "lottie-react";
import zIndex from '@mui/material/styles/zIndex';

export default function TodoControl({ todo, setTodo, currentTime }: { currentTime: DateTime, todo: DTOTodo, setTodo: (todo: DTOTodo | null) => void }) {

    const [showModal, setShowModal] = useState(false);
    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)


    return <>
        <div className="todoContainer" style={{
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
                    setTodo({
                        ...todo,
                        completed: e.target.checked
                    })

                }} />



            <DeleteButton deleteTodo={() => { setTodo(null) }} />
        </div>


        {
                showModal &&

                <div
                    onClick={(e) => {setShowModal(false); e.stopPropagation();}}
                    style={{
                        opacity: "100%",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 5000,
                    }}>

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
                            zIndex: 100,
                            
                        }}>

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
                                margin: "10px 20px",
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
                                margin: "10px 20px",
                                height: 280,
                            }}
                        />

                        <button
                            onClick={() => {

                                setTitleError(todo.title.length < 1)
                                setContentError(todo.content.length < 1)

                                if (todo.title.length * todo.content.length < 1) return;

                                setTodo(todo);
                                setShowModal(false);
                            }}
                            style={{
                                backgroundColor: 'white',
                                cursor: 'pointer',
                                color: 'black',
                                border: '1px solid #ccc',
                                borderRadius: 7,
                                fontSize: "1.2rem",
                                fontWeight: 500,
                                padding: "8px 14px",
                                margin: "10px 20px",
                            }}
                        >
                            Save
                        </button>


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

                       


                                <input type="checkbox" style={{
                                    width: '1rem',
                                    height: '1rem',
                                }} checked={todo.dueDate !== null} onChange={(e) => {
                                    setTodo({
                                        ...todo,
                                        dueDate: todo.dueDate !== null ? null : DateTime.fromJSDate(new Date())
                                    })
                                }} />

                                
                                 {todo.dueDate == null ? 'not' : ''} relevant

                        </div>
                    </div>
                </div>
            }

    </>
}