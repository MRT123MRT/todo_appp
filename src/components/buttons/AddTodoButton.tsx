
import { useState } from 'react'
import Todo from '../../models/Todo'
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';


export function AddTodoButton({ addTodo }: { addTodo: (todo: Todo) => void }) {
    const [showModal, setShowModal] = useState(false)
    const [todo, setTodo] = useState<Todo>({
        title: "",
        content: "",
        completed: false,
        id: v4(),
        dueDate: DateTime.fromJSDate(new Date())
    } as Todo)

    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)

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
                }}>
                <img alt="add icon" src="/file-plus.svg" width={25} height={25} />
            </button>

            {
                showModal &&

                <div
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: 400,
                            height: 400,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            margin: 'auto',
                            marginTop: 100,
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
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
                                margin: "0px 20px",
                                height: 280,
                            }}
                        />

                        <button
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
                                    } as Todo
                                )
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
                            }}
                        >
                            Add todo
                        </button>

                        <div>


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
                            }}>


                                <input type="checkbox" style={{
                                    width: 30,
                                    height: 30,
                                }} checked={todo.dueDate == null} onChange={(e) => {
                                    setTodo({
                                        ...todo,
                                        dueDate: todo.dueDate !== null ? null : DateTime.fromJSDate(new Date())
                                    })
                                }} />

                                Due date {todo.dueDate == null ? 'disabled' : 'enabled'}

                            </div>

                        </div>
                    </div>





                </div>
            }
        </>
    )
}