import { useState } from 'react'
import Todo from '../../models/Todo'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export function EditTodoButton({ updateTodo, todo }: { updateTodo: (todo: Todo) => void, todo: Todo }) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [showModal, setShowModal] = useState(false)
    const [_todo, setTodo] = useState<Todo>(todo)

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
                    border: 'none',
                    borderRadius: 10,
                    padding: "0px",
                    margin: "0px 10px",
                }}>
                <img alt="add icon" src="/edit-2.svg" width={25} height={25} />
            </button>

            {
                showModal &&

                <div
                    onClick={() => setShowModal(false)}
                    style={{
                        position: 'absolute',
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
                                margin: "0px 20px",
                            }}
                        />

                        <textarea
                            onFocus={() => setContentError(false)}
                            onChange={(e) => setTodo({
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
                                margin: "0px 20px",
                                height: 280,
                            }}
                        />

                        <button
                            onClick={() => {

                                setTitleError(_todo.title.length < 1)
                                setContentError(_todo.content.length < 1)

                                if (_todo.title.length * _todo.content.length < 1) return;

                                updateTodo(_todo);
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
                            }}
                        >
                            Save
                        </button>


                        <DatePicker
                            timeIntervals={5}
                            showTimeSelect
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MM-dd-yyyy, HH:mm"
                            timeFormat='HH:mm'
                        />
                    </div>
                </div>
            }
        </>

    )

}
