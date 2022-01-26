import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';
import UserForm from './app/components/user-form/UserForm';
import { UserProvider } from './app/context/UserContext';

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);