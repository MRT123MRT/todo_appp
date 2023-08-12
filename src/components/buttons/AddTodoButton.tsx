
import { useState } from 'react'
import DTOTodo from '../../models/TypeTodo'
import DatePicker from "react-datepicker";
import { v4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
import { DateTime } from 'luxon';
import TodoForm from '../TodoForm';
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
    
    return (
        <>
            <button 
            
            className='addTodobtn'
                onClick={() => setShowModal(true)}
                >
                <img alt="add icon" src="/file-plus.svg" width={25} height={25} />
            </button>

            {
                showModal &&

                <TodoForm action='add todo!' submit={addTodo} showModal ={showModal} setShowModal={setShowModal} />
            }
        </>
    )
}