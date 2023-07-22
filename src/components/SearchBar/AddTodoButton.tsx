
import { useState } from 'react'
import Todo from '../../models/Todo'
import { DatePicker } from "antd";


    
export function AddTodoButton({ addTodo }: { addTodo: (todo: Todo) => void }) {

    const [showModal, setShowModal] = useState(false)
    const [todo, setTodo] = useState<Todo>({
        title: "",
        content: "",
        completed: false,
        createdAt: new Date(),
        id: "",
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
                                        id: "",
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

                    </div>

                        <DatePicker />

                </div>
            }
        </>
    )
}