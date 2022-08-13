//Dependencies
import React, { useEffect, useState, useRef } from "react";
import {
    Route,
    Routes,
    useNavigate,
    Outlet,
    NavigationType,
} from "react-router-dom";

//Components
import { Login } from "./components/login.js";
import { Register } from "./components/Register.js";
import { NavBar } from "./components/navbar.js";
import { RegionSelector } from "./components/regionSelector.js";
import { Other } from "./components/other.js";
import { Explorer } from "./components/explorer.js";
import  jwtDecode  from "./helpers/jwtdecode.js";

//Styles
import "./styles/navbar.css";


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
    useEffect(
        () => (!loggedIn ? navigate("login") : navigate("/")),
        [loggedIn]
    );

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
    const handleLogin = (tokens) => {
        const decodedUser = jwtDecode(tokens.accessToken);
        setUser();
        setLoggedIn(true);
    };

    /**
     * handles click from logout button
     * clears all user info from local storage and user state
     * sets new false loggedIn state which will auto navigate back to login page
     */
    const logout = () => {
        setUser({});
        setLoggedIn(false);
    };

    //Route changers
    // const goOther = () => navigate("/other");
    const goExplorer = (polygons) =>
        navigate("/explorer", {
            state: { polygons: JSON.stringify(polygons) },
        });

    //ROUTES
    const Home = () => <RegionSelector goExplorer={goExplorer} />;

    return (
        <>
            {loggedIn && <NavBar user={user} logout={logout} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/other" element={<Other />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            handleLogin={handleLogin}
                        />
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/explorer" element={<Explorer />} />
            </Routes>
        </>
    );
};

export { App };
