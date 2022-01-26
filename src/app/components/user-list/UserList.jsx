import { useContext, useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import UserContext from '../../context/UserContext';

function UserList() {
    const {users, userIdEmitter, deleteUser, formGoalEmitter, formModeEmitter} = useContext(UserContext);
    const navigate = useNavigate();

    const handlePlus = () => {
        formGoalEmitter('plus');
        formModeEmitter(true);
        navigate('/form');
    }
    
    const handleEdit = (id) => {
        userIdEmitter(id);
        formGoalEmitter('edit');
        formModeEmitter(true);
        navigate('/form');
    }
    
    const handleTrash = (id) => {
        if (window.confirm('Are you sure you want to delete it ?')) deleteUser(id);
    }

    return (
        <div className="catalog">
            {users.map((user) => (
                <div className="card">
                    <div className="vehicle-info">
                        <img src="" alt="" />
                        <div className="upper-block">
                            <h2 className="name" style={{color: 'white'}}>{user.name}</h2>
                            <div className="icon-block">
                                <FaPlus className="icon" onClick={handlePlus} />
                                <FaTrash className="icon" onClick={() => {handleTrash(user.id)}} />
                                <FaEdit className="icon"  onClick={() => {handleEdit(user.id)}} />
                            </div>
                        </div>
                        <div className="price" style={{color: 'white'}}><span style={{color: '#5df37b'}}>Email: </span>{user.email}</div>
                        <div className="model" style={{color: 'white'}}><span style={{color: '#5df37b'}}>CPF: </span> {user.cpf}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserList;
