import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//@ts-ignore
import cookie from 'react-cookies'
import { ToastContainer, toast } from 'react-toastify';
import { loginFetch } from '../fetches/userFetches';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(false);






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
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    onClick={() => loginFetch(username, password, rememberMe)}
                    fullWidth>Sign in</Button>
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