import React from 'react';
import cookie from 'react-cookies'
import '../../App.css'
type LogoutButtonProps = {
    logout: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ logout }) => {


    return (
        <button className='LogoutButton'
            onClick={() => logout()}>
            <img alt="add icon" src="/log-out.svg" width={25} height={25} />
        </button>


    )
}


export default LogoutButton;