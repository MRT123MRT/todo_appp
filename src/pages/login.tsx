import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//@ts-ignore
import cookie from 'react-cookies'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(false);

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e', margin: "20px auto" }
    const btnstyle = { margin: '8px 0' }
    const forgotPasswordStyle = { margin: '8px 0', textAlign: 'center' }
    return (
        <Grid className="container">
            <Paper elevation={10} style={paperStyle}>

                <Grid style={{ textAlign: 'center' }} >

                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
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
                <FormControlLabel
                    control={
                        <Checkbox
                            value={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={async () => {




                    fetch('http://localhost:5000/login', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }).then(async res => {

                        if (res.ok) {
                            let data = await res.json()
                            cookie.save('token', data.token, { // FUNCTION IN A NOTHER PLACE
                                path: '/',
                                expires: rememberMe ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) : null
                                
                            })

                            toast("you are logged in");
                            timeout(50000)
                            window.location.href = "/"
                        }
                        else {
                            toast("username or password is incorrect");
                        }


                    }).catch(err => {
                        console.log(err);
                        toast("we have some problems with server");

                    })





                }} fullWidth>Sign in</Button>
                <ToastContainer />
                <Typography justifyContent={'center'} >
                    <Button variant="text" size='small' onClick={() => window.location.href = "https://youtu.be/VOQYO7iGF3M"}>Forgot password ?</Button>

                </Typography>
                <Typography > Is it your first time here?
                    <Button variant="text" size='small' onClick={() => window.location.href = "/register"}>Sign up</Button>
                </Typography>
            </Paper>
        </Grid >
    )
}

export default Login