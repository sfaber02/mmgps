import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const NavBar = ({user, logout}) => {
    const navigate = useNavigate();

    return (
        <div id="navBarContainer">
            <p>{user.username}</p>
            <button onClick={() => navigate('/')}>
                Region Selector
            </button>
            <button onClick={() => navigate('/explorer')}>
                Explorer
            </button>
            <button id="logout" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export { NavBar };
