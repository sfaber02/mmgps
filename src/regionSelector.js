import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GoogleMap, useLoadScript, Marker, Polygon, DrawingManager } from '@react-google-maps/api';
import { options, libraries, mapContainerStyle, center, polyOptions, drawOptions } from './mapConfig/config';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import './styles/map.css';
import '@reach/combobox/styles.css';


const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;


const RegionSelector = () => {
    const mapRef = useRef();
    const [polygons, setPolygons] = useState(() => []);
    
    /** loads all the google maps scripts */
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    })

    /**
     * Sets the mapRef to the map when a new map is loaded
     * for saving current instance of the map
     */
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])
    
    /**
     * used for panning the map to a specific lat and lng
     */
    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(18);
    }, [])

    /**
     * adds a completed polygon to the polygon state
     * extracts coordinates from polygon to render  a static map
     * @param {object} polygon 
     */
    const getPolygonPath = (polygon) => {
        setPolygons(prev => [...prev, polygon]);
        const coords = polygon.getPath();
        console.log(typeof coords);
        console.log (coords);
        console.log (coords.Gd.map(coord => `${coord.lat()}, ${coord.lng()}`));
    }

    /**
     * clears all polygons off the map
     */
    const resetMap = () => {
        polygons.forEach(polygon => polygon.setMap(null));
        setPolygons([]);
    }

    
    if (loadError) return 'error loading maps';
    if (!isLoaded) return 'LOADING';

    return (
        <div id='mapContainer'>
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <button>Select Area</button>
            <button onClick={resetMap}>Reset</button>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                <DrawingManager
                    onPolygonComplete={getPolygonPath}
                    drawingMode='polygon'
                    options={drawOptions}

                />
            </ GoogleMap>
        </div>
    );
}


/**
 * requests users current location based on browser location data and pans map to those coords
 * @param {function} panTo function for panning map to new coords 
 * @returns 
 */
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
   
    /**
     * Settings for useplaces autocomplete
     */
    const {ready, value, suggestions: { status, data }, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 40.777955, lng: () => -73.968740},
            radius: 200 * 1000,
        }
    });

    /**
     * takes in address from combobox and parses address into lat/lng coords
     * automatically pans the map to these coords
     * @param {string} address 
     */
    const handleSelect = async (address) => {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (err) {
            alert(err);
        }
    }

    /**
     * sets value state for usePlacesAutoComplete hook
     */
    const handleInput = (e) => {
        setValue(e.target.value)
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder='Enter an address' />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' && data.map(({id, description}) => <ComboboxOption key={uuidv4()} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}


export { RegionSelector }


