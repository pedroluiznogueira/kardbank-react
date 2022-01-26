import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import './Navbar.css';

function Navbar({ navigation }) {
    const navigate = useNavigate();
    const {onFormMode} = useContext(UserContext);

    const handleHome = () => {
        navigate("/");
    }

    const handleGoBack = () => {
        navigate('/');
    }

    return(
        <nav className="navbar">
            <div className="logo-block">
                <h1 onClick={handleHome} className="logo">Kardbank</h1>
            </div>
            {
                onFormMode ?
                <div className="logout-block">
                    <h1 onClick={handleGoBack} className="logo">{navigation}</h1>
                </div> :
                <span></span>
            }
        </nav>
    );
}

export default Navbar;