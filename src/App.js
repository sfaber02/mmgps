//Dependencies
import React, { useEffect, useState } from "react";
import {
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";

import axios from "axios";

//Components
import { Login } from "./components/Login.js";
import { Register } from "./components/Register.js";
import { NavBar } from "./components/Navbar.js";
import { RegionSelector } from "./components/RegionSelector.js";
import { Explorer } from "./components/Explorer.js";
import jwtDecode from "./helpers/jwtdecode.js";

//Styles
import "./styles/navbar.css";

//Globals
const API = process.env.REACT_APP_API_BACKEND;

const App = () => {
    /** STATES AND REFS
     * loggedIn - boolean state for user logged in status
     * user - stores username, email, and JWT token for logged in user
     * polygonss - stores saved polygons from regionSelector component
     */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(() => {});
    const [polygons, setPolygons] = useState(() => null);


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

    return (
        <>
            {loggedIn && <NavBar logout={logout} user={user} />}
            <Routes>
                <Route
                    path="/"
                    element={<RegionSelector polygons={polygons} setPolygons={setPolygons} />}
                />
                <Route
                    path="/login"
                    element={<Login handleLogin={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/explorer" element={<Explorer polygons={polygons} />} />
            </Routes>
        </>
    );
};

export { App };
