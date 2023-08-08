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
                    </div>
                </div>
            }
        </>

    )

}
