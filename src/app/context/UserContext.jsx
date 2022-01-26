import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ( {children} ) => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [formGoal, setFormGoal] = useState('');

    const url = 'http://localhost:8080';

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
        const response = await fetch(`${url}/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        setUsers(users.map((user) => (user.id === userId ? {...user, ...data}: user))); 
        return data;
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
            userIdEmitter: userIdEmitter,
            formGoalEmitter: formGoalEmitter,
            registerUser: registerUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;