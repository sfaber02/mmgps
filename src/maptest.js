import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleMap } from 'react-google-maps';
import { WrappedMap } from './map';
import './styles/map.css';




const TheMap = () => {

    const navigate = useNavigate();

    const changePath = () => navigate('two');
    const changePath2 = () => navigate('/');

    const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    const Path1 = () => {
       
        return (
            <div id='mapContainer'>
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLEMAPSKEY}`} 
                    loadingElement={<div style={{height: '100%'}}/>}
                    containerElement={<div style={{height: '100%'}}/>}
                    mapElement={<div style={{height: '100%'}}/>}
                />
            </div>

        )
        
        
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


export { TheMap }