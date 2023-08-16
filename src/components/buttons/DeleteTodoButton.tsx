import React from 'react';
import '../../App.css'
type DeleteButtonProps = {
    deleteTodo: () => void,
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ deleteTodo }) => {

    return (
        <button className='DeleteButton'
            onClick={()=> deleteTodo()}>
            <img alt="add icon" src="/trash-2.svg" width={25} height={25} />
        </button>


    )
}


export default DeleteButton;