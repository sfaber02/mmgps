//Dependencies
import { AES, enc } from 'crypto-js';
import React, { useEffect, useState, useRef } from 'react';
import { Route, Routes, useNavigate, Outlet, NavigationType } from 'react-router-dom';


//Components
import { Login } from './login.js';
import { NavBar } from './navbar.js';
import { RegionSelector } from "./regionSelector.js";
import { Other } from './other.js';
import { Explorer } from './explorer.js';

//Styles
import './styles/navbar.css'

//Globals
const LOCAL_STORAGE_KEY = 'mmgps.credentials';
const ENCRYPT_KEY = process.env.REACT_APP_CRYPTO_SECRET;

/** Load saved user if auto-login is enabled */
let storedUser =JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
if (!storedUser) storedUser = '';


const App = () => {

    /** STATES AND REFS
     * loggedIn - boolean state for user logged in status
     * user - stores username, email, and JWT token for logged in user
     * polys - stores saved polygons from regionSelector component
     */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(() => {});
    const navigate = useNavigate();

    /** Sends user to login page on page launch or automatically logs in last user if auto-login was selected */
    useEffect(() => !loggedIn ? navigate('login') : navigate('/'), [loggedIn]);
    
    /**
     * Sets user state based on info return from DB
     * sets logged in state to true which will auto navigate to home route
     * stores email / encrypted password locally if auto login option was selected
     * @param {string} name 
     * @param {string} email 
     * @param {string} token 
     * @param {boolean} save 
     * @param {string} password 
     */
    const handleLogin = (name, email, token, save, password) => {
        setUser({name, email, token});
        setLoggedIn(true);
        if (save && storedUser.email !== email) {
            const encryptedPW = AES.encrypt(password, ENCRYPT_KEY).toString();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ email, password: encryptedPW }));
        }
    }

    /**
     * handles click from logout button
     * clears all user info from local storage and user state
     * sets new false loggedIn state which will auto navigate back to login page
     */
    const logout = () => {
        localStorage.clear();
        storedUser = '';
        setUser({});
        setLoggedIn(false);
    }

    //Route changers
    const goOther = () => navigate('/other');
    const goExplorer = polygons => navigate('/explorer', { state: { polygons: JSON.stringify(polygons) } });

    //ROUTES
    const Home = () => <RegionSelector goExplorer={goExplorer}/>;

    return ( 
        <>
            {loggedIn && <NavBar user={user} logout={logout} other={goOther} />}
            <Routes>
                <Route path='/*' element={ <Home /> } />
                <Route path='/other' element= { <Other /> } />
                <Route path='login/*' element={<Login handleLogin={handleLogin} storedUser={storedUser} />} />
                <Route path='/explorer' element={<Explorer />} />
            </Routes>
        </>
    ) 
}


export { App };