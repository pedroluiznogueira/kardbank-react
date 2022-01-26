import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ( {children} ) => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formGoal, setFormGoal] = useState('');
    const [onFormMode, setOnFormMode] = useState(false);

    const url = 'https://kardbank-api.herokuapp.com';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch(`${url}/users/find`, {
            method: 'GET'
        });
        const data = await response.json();
        setUsers(data);
    }

    const formGoalEmitter = (goal) => {
        setFormGoal(goal);
    }

    const formModeEmitter = (onFormMode) => {
        setOnFormMode(onFormMode);
    }

    const uploadFile = async (formData) => {
        console.log(formData);
        const response = await axios.post(`${url}/upload-file`, formData);
    }

    const registerUser = async (user) => { 
        const response = await fetch(`${url}/users/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        setUsers([data, ...users]);
        return data;
    }

    const userIdEmitter = (id) => {
        setUserId(id);
    }

    const updateUser = async (user) => {
        console.log("called update");
        const response = await fetch(`${url}/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data);
        setUsers(users.map((user) => (user.id === userId ? {...user, ...data}: user))); 
        return response;
    }

    const deleteUser = async (userId) => {
        const response = await fetch(`${url}/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        setUsers(users.filter((user) => user.id !== userId));
    }

    return(
        <UserContext.Provider value={{
            users: users,
            formGoal: formGoal,
            onFormMode: onFormMode,
            userIdEmitter: userIdEmitter,
            uploadFile: uploadFile,
            formGoalEmitter: formGoalEmitter,
            registerUser: registerUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            formModeEmitter: formModeEmitter
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;