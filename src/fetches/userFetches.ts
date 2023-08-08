import { toast } from 'react-toastify';
import cookie from 'react-cookies';



const ifAllFeildsAreFilled = (username: string, password: string) => {


    if (username === '' || password === '') {
        toast("please fill all fields");
        return false;
    }

    return true;
}


const fieldsCheck = (username: string, password: string, email: string) => {


    if (username === '' || password === '' || email === '') {
        toast("please fill all fields");
        return false;
    }
    else if ((/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm).test(email) === false) {

        toast("email is not valid");
        return false;
    }

    return true;
}



export const loginFetch = async (username: string, password: string, rememberMe: boolean) => {



    if (!ifAllFeildsAreFilled(username, password))
        return;

    console.log(JSON.stringify({
        username,
        password
    }))


    fetch('http://localhost:5000/auth/login', {
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
            window.location.href = "/"
        }
        else {
            toast("username or password is incorrect");
        }


    }).catch(err => {
        console.log(err);
        toast("we have some problems with server");

    })
}



export const registerFetch = async (username: string, password: string, email: string) => {

    if (!fieldsCheck(username, password, email))

        return;


    fetch('http://localhost:5000/auth/register', {
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
            toast("all good");

            window.location.href = "/login"

        }
        else if (res.status === 409) {
            toast("username or email already exists");
        }


        else {
            console.log(await res.json())
            toast("we have some problems with server");
        }


    }).catch(err => {
        console.log(err);
        //toast("we have some problems with server");
    })
}
