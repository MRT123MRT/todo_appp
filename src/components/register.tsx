import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(false);

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const btnstyle = { margin: '8px 0' }

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

                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={async () => {




                    fetch('http://localhost:5000/register', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            username,
                            password, 
                            email
                        })
                    }).then(async res => {

                        if (res.status >= 200 && res.status < 300) {
                            console.log("vse zaebisi")
                            alert('all good')
                            window.location.href = "http://localhost:3000/login"
                            
                        }
                        else {
                            console.log(await res.json())
                            alert('something went wrong')
                        }


                    }).catch(err => {
                        console.log(err);
                        alert('we have some problems with server')

                    })





                }} fullWidth>register</Button>


            </Paper>
        </Grid >
    )
}

export default Register