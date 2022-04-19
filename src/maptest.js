import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const Map = () => {

    const navigate = useNavigate();

    const changePath = () => navigate('two');
    const changePath2 = () => navigate('');

    const Path1 = () => {
        return <button onClick={changePath}>PATH 1</button>
    }

    const Path2 = () => {
        return <button onClick={changePath2}>Path 2</button>
    }

    return (
        <Routes>
            <Route path='/' element={<Path1 />} />
            <Route path='two' element={<Path2 />} />
        </Routes>
    )

}


export { Map }