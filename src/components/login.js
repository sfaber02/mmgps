import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_BACKEND;


/**
 * Handles login requests and new registration with backend
 * @param {props} props 
 */
const Login = ({handleLogin}) => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    /** Sends inputted email and pw from login form to backend for authentication */
    const handleLoginAttempt = (e) => {
        e.preventDefault();
         
        const data = JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        });

        const config = {
            method: "post",
            url: `${API}/users/login/`,
            headers: {
                "Content-Type": "application/json"
            },
            data: data,
            withCredentials: true,
        };

        axios(config)
            .then((res) => {
                console.log(res);
                handleLogin(res.data.accessToken);
            })
            .catch((err) => {
                console.log("ERROR");
                setMessage(err);
            })
        
    }

    // navigate to register page
    const handleNewUserClick = () => navigate('/register');

     return (
         <div id="login">
             <form onSubmit={handleLoginAttempt}>
                 <label>Email: </label>
                 <input type="text" name="email"></input>
                 <br />
                 <label>Password: </label>
                 <input type="password" name="password"></input>
                 <br />
                 <input type="submit" value="Submit" />
                 <label>Auto Login</label>
                 <input type="checkbox" name="save" />
             </form>
             <br />
             <button id="newUser" onClick={handleNewUserClick}>
                 Sign Up
             </button>
             <p id="loginMessage">{message}</p>
         </div>
     );
}

export { Login };