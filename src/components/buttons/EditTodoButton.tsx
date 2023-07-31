import { useState } from 'react'
import DTOTodo from '../../models/TypeTodo'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';


export function EditTodoButton({ updateTodo, todo }: { updateTodo: (todo: DTOTodo) => void, todo: DTOTodo }) {

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const [showModal, setShowModal] = useState(false)
    const [_todo, setTodo] = useState<DTOTodo>(todo)

    const [titleError, setTitleError] = useState(false)
    const [contentError, setContentError] = useState(false)

    return (
        <>
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

                        <div style={{
                            backgroundColor: 'red',
                            width: 30,  
                            height: 30,

                        }} />

                        {/* <input
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
                                margin: "20px 20px",
                                flexShrink: 0,
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
                                margin: "20px 20px",
                                flexShrink: 0,
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
                                margin: "0px 10px",
                            }}
                        >
                            Save
                        </button>


                        <div>


                            <DatePicker
                                timeIntervals={5}
                                showTimeSelect
                                disabled={_todo.dueDate == null}
                                selected={DateTime.fromISO(_todo?.dueDate?.toString() || new Date().toISOString()).toJSDate()}
                                onChange={(date) => setTodo({
                                    ..._todo,
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
                                }} checked={_todo.dueDate !== null} onChange={(e) => {
                                    setTodo({
                                        ..._todo,
                                        dueDate: _todo.dueDate !== null ? null : DateTime.fromJSDate(new Date())
                                    })
                                }} />


                                {_todo.dueDate == null ? 'not' : ''} relevant

                            </div>

                        </div> */}
                    </div>
                </div>
            }
        </>

    )

}
