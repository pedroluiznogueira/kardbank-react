import { useState, useContext } from 'react';
import spinner from '../../common/spinner/spinner.gif';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';
import UserContext from '../../context/UserContext';
import Navbar from './../../common/navbar/Navbar';

const user = {
    name: '',
    email: '',
    cpf: ''
}

function UserForm() {
    const navigate = useNavigate();
    const [nameText, setNameText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [cpfText, setCpfText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {updateUser, registerUser, formGoal} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        handleUser(formGoal);
    }

    const handleUser = (goal) => {
        user.name = nameText;
        user.email = emailText;
        user.cpf = cpfText;

        if (formGoal === 'plus') {
            const promise = registerUser(user);
            promise.then(() => {
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/');
                }, 2000);
            });

        } else {
            const promise = updateUser(user);
            promise.then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/');
                }, 2000);
            });
        }
    }

    const handleNameChange = (e) => {
        setNameText(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    }

    const handleCpfChange = (e) => {
        setCpfText(e.target.value);
    }

    return (
        <>
            <Navbar navigation={"Go Back"}/>
            <div className="catalog">
                <form className="plus-form" onSubmit={handleSubmit}>
                    <h3>Vehicle {formGoal}</h3>
                    <div className="input-block">
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            value={nameText}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="brand">Email</label>
                        <input 
                            id="brand" 
                            type="text" 
                            value={emailText} 
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="model">CPF</label>
                        <input 
                            id="model" 
                            type="text" 
                            value={cpfText}
                            onChange={handleCpfChange}
                        />    
                    </div>
                    <div id="feedback" className="input-block">
                    {
                        isLoading ?
                        <img
                            src={spinner}
                            style={{width: '50px'}}
                        /> : 
                        <button className="btn" type="submit">Send</button>
                    }
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserForm;