import React, { useEffect, useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Interval } from 'luxon';
import { registerFetch } from '../fetches/userFetches';
const Register = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false);

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const btnstyle = { margin: '8px 0' }

    const ifAllFeildsAreFilled = () => {

        
        if (username === '' || password === '' || email === '') {
            toast("please fill all fields");
            return false;
        }   
        else if((/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm).test(email) === false){
                
                toast("email is not valid");
                return false;
        }
    
        return true;
    }

    return (
        <Grid className="container">
            <Paper elevation={10} style={paperStyle}>

                <Grid style={{ textAlign: 'center' }} >

                    <img alt="add icon" src="/empty.svg" width={100} height={100} />
                    <h2> register</h2>
                </Grid>
                <TextField
                    label='email'
                    margin="normal"
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'

                    fullWidth required />

                <TextField
                    label='Username'
                    margin="dense"
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'
                    fullWidth required />

                <TextField
                    label='Password'
                    margin="dense"
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter password'
                    fullWidth required />

                <Button 
                type='submit' 
                color='primary' 
                variant="contained" 
                style={btnstyle} 
                onClick={() => registerFetch(username, password, email)}
                fullWidth>register</Button>

            <ToastContainer />
            <Typography > Login?
                    <Button variant="text" size='small' onClick={() => window.location.href = "/login"}>Sign in</Button>
                </Typography>
            </Paper>
        </Grid >
    )
}

export default Register