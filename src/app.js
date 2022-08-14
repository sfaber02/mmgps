//Dependencies
import React, { useEffect, useState, useRef } from "react";
import {
    Route,
    Routes,
    useNavigate,
    Outlet,
    NavigationType,
} from "react-router-dom";

import axios from "axios";

//Components
import { Login } from "./components/login.js";
import { Register } from "./components/Register.js";
import { NavBar } from "./components/navbar.js";
import { RegionSelector } from "./components/regionSelector.js";
import { Explorer } from "./components/explorer.js";
import jwtDecode from "./helpers/jwtdecode.js";

//Styles
import "./styles/navbar.css";

//Globals
const API = process.env.REACT_APP_API_BACKEND;

const App = () => {
    /** STATES AND REFS
     * loggedIn - boolean state for user logged in status
     * user - stores username, email, and JWT token for logged in user
     * polys - stores saved polygons from regionSelector component
     */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(() => {});
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            axios
                .get(`${API}/users/refresh_token`, { withCredentials: true })
                .then((res) => {
                    console.log(res);
                    handleLogin(res.data.accessToken);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    /** Sends user to login page on page launch or automatically logs in last user if auto-login was selected */
    useEffect(() => {
        !loggedIn ? navigate("/login") : navigate("/");
    }, [loggedIn]);

    const handleLogin = (accessToken) => {
        // save access token to session storage
        sessionStorage.setItem("accessToken", accessToken);

        // decode user info from access token, set user state, set logged in
        const { email, username, user_id } = jwtDecode(accessToken);
        setUser({ email, username, user_id });
        setLoggedIn(true);
    };

    /**
     * handles click from logout button
     * clears all user info from local storage and user state
     * sets new false loggedIn state which will auto navigate back to login page
     */
    const logout = () => {
        axios({
            method: "post",
            url: `${API}/users/logout/`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data.msg);
                setUser({});
                setLoggedIn(false);
                sessionStorage.clear();
            })
            .catch((err) => console.log(err));
    };

    //Route changers
    // const goOther = () => navigate("/other");
    const goExplorer = (polygons) =>
        navigate("/explorer", {
            state: { polygons: JSON.stringify(polygons) },
        });

    return (
        <>
            {loggedIn && <NavBar logout={logout} user={user} />}
            <Routes>
                <Route
                    path="/"
                    element={<RegionSelector goExplorer={goExplorer} />}
                />
                <Route
                    path="/login"
                    element={<Login handleLogin={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/explorer" element={<Explorer />} />
            </Routes>
        </>
    );
};

export { App };
