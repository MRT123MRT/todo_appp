import React from 'react';
import cookie from 'react-cookies'



function LogoutButton({logout }: { logout: () => void, }) {
    
    
    return (
        <button
            style={{
                backgroundColor: 'white',
                cursor: 'pointer',
                color: 'white',
                border: '1px solid #ccc',
                borderRadius: 10,
                padding: "8px 14px",
                marginLeft: 10,
                boxShadow: '0px 0px 5px #ccc',  
            }}
            onClick={()=> logout()}>
            <img alt="add icon" src="/log-out.svg" width={25} height={25} />
        </button>


    )
}


export default LogoutButton;