import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './styles/map.css';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const center = {
    lat: 40.777955,
    lng: -73.968740,
}

const TheMap = () => {
    const navigate = useNavigate();
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    })

    if (loadError) return 'error loading maps'
    if (!isLoaded) return 'LOADING'

    const changePath = () => navigate('two');
    const changePath2 = () => navigate('/');


    const Path1 = () => {
       
            return (
                <div>
                    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} ></ GoogleMap>
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