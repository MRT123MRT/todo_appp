import React from 'react';


function DeleteButton({ deleteTodo }: { deleteTodo: () => void, }) {

    return (
        <button
            style={{
                backgroundColor: '#00000000',
                cursor: 'pointer',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: "0px",
                margin: "0px 10px",
            }}
            onClick={()=> deleteTodo()}>
            <img alt="add icon" src="/trash-2.svg" width={25} height={25} />
        </button>


    )
}


export default DeleteButton;