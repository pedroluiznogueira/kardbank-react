import { useContext, useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UserList.css';
import UserContext from '../../context/UserContext';

function UserList() {
    const {users, userIdEmitter, deleteUser, formGoalEmitter} = useContext(UserContext);
    const navigate = useNavigate();

    const handlePlus = () => {
        formGoalEmitter('plus');
        navigate('/form');
    }
    
    const handleEdit = (id) => {
        userIdEmitter(id);
        formGoalEmitter('edit');
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
                        <div className="upper-block">
                            <h2 className="name" style={{color: 'white'}}>{user.name}</h2>
                            <h2 className="price" style={{color: 'green'}}>$ {user.price}</h2>
                        </div>
                        <div className="bottom-block">
                            <div className="text-block">
                                <div className="model" style={{color: 'white'}}>{user.model}</div>
                                <div className="brand" style={{color: 'white'}}>{user.brand}</div>
                            </div>
                            <div className="icon-block">
                                <FaPlus className="icon" onClick={handlePlus} />
                                <FaTrash className="icon" onClick={() => {handleTrash(user.id)}} />
                                <FaEdit className="icon" onClick={() => {handleEdit(user.id)}} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserList;
