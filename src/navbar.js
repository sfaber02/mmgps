import React, { useEffect, useState } from "react";



const NavBar = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => setUser(props.user), [props.user]);

    return (
        <div id="navBarContainer">
            <p>{user.name}</p>
            <button onClick={props.other}>
                Other
            </button>
            <button id="logout" onClick={props.logout}>
                Logout
            </button>
        </div>
    );
};

export { NavBar };
