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


export default function TodoControl({ todo, setTodo, currentTime }: { currentTime: DateTime, todo: DTOTodo, setTodo: (todo: DTOTodo | null) => void }) {

    const [showModal, setShowModal] = useState(false);
    const [titleError, setTitleError] = useState(false)
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
                            toast('todo marked')
                        }
                        else {
                            console.log(await res.json())
                            toast('something went wrong')
                        }
                    }).catch(err => {
                        console.log(err);
                        toast('we have some problems with server')

                    })
                }} />





            <DeleteButton deleteTodo={async () => {
                fetch('http://localhost:5000/deleteTodo', {
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
            }} />



        </div>
        <ToastContainer />

        {
            showModal &&

            <div
                onClick={(e) => { setShowModal(false); e.stopPropagation(); }}
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
                        onChange={(e) => _setTodo({
                            ..._todo,
                            title: e.target.value
                        })}
                        value={_todo.title}
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
                        onChange={(e) => _setTodo({
                            ..._todo,
                            content: e.target.value
                        })}
                        value={_todo.content}
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
                            setTitleError(_todo.title.length < 1)
                            setContentError(_todo.content.length < 1)
                            if (_todo.title.length * _todo.content.length < 1) return;




                            const newTodo = {
                                ..._todo,

                            }


                            console.log(newTodo)

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
                            disabled={_todo.dueDate == null}
                            selected={DateTime.fromISO(_todo?.dueDate?.toString() || new Date().toISOString()).toJSDate()}
                            onChange={(date) => _setTodo({
                                ..._todo,
                                dueDate: DateTime.fromJSDate(date as Date)
                            })}
                            dateFormat="MM-dd-yyyy, HH:mm"
                            timeFormat='HH:mm'
                        />




                        <input type="checkbox" style={{
                            width: '1rem',
                            height: '1rem',
                        }} checked={_todo.dueDate !== null} onChange={(e) => {
                            _setTodo({
                                ..._todo, // put this function outside
                                dueDate: _todo.dueDate !== null ? null : DateTime.fromJSDate(new Date())
                            })
                        }} />


                        {_todo.dueDate == null ? 'not' : ''} relevant

                    </div>
                </div>
            </div>
        }

    </>
}