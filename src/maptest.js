import React, { useCallback, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './styles/map.css';
import '@reach/combobox/styles.css';

import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { options, libraries, mapContainerStyle, center } from './mapConfig/config';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';


const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;


const TheMap = () => {
    const navigate = useNavigate();
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    })
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    }, [])


    if (loadError) return 'error loading maps'
    if (!isLoaded) return 'LOADING'

    const changePath = () => navigate('two');
    const changePath2 = () => navigate('/');


    const Path1 = () => {
            return (
                <div id='mapContainer'>
                    <Search panTo={panTo} />
                    <Locate panTo={panTo} />
                    <GoogleMap 
                        mapContainerStyle={mapContainerStyle} 
                        zoom={15} 
                        center={center} 
                        options={options}
                        onLoad={onMapLoad}
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

const Locate = ({ panTo }) => {
    return (
        <button onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }, (err) => console.log(err));
        }}>
            Locate
        </button>
    )
}

const Search = ({ panTo }) => {
    const {ready, value, suggestions: { status, data }, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 40.777955, lng: () => -73.968740},
            radius: 200 * 1000,
        }
    });

    return (
        <Combobox 
            onSelect={async (address) => {
                try {
                    const results =  await getGeocode({address});
                    const { lat, lng } = await getLatLng(results[0]);
                    panTo({ lat, lng });
                } catch(err) {
                    alert (err);
                }
            }}>
            <ComboboxInput 
                value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}
                disabled={!ready}
                placeholder='Enter an address' 
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' && data.map(({id, description}) => <ComboboxOption key={uuidv4()} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}


export { TheMap }