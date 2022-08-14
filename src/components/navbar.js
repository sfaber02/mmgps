import React, { useEffect, useState } from "react";



const NavBar = ({user, logout}) => {
    

    // useEffect(() => setUser(user), [props.user]);

    return (
        <div id="navBarContainer">
            <p>{user.username}</p>
            <button id="logout" onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export { NavBar };
