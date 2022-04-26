import React from "react";
import { useNavigate } from "react-router-dom";

const Other = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>YAY THIS ROUTE WORKS</h1>
            <button onClick={() => navigate('/')}>Go back</button>
        </>
    )
}

export { Other };