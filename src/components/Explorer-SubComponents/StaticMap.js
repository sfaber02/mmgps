import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { libraries, mapContainerStyle, options } from "../../mapConfig/explorer-config";

const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export const StaticMap = ({ coords, minMax, multiplier }) => {
    const [center, setCenter] = useState(null);
    const mapRef = useRef();

    /** loads all the google maps scripts */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    });

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if (minMax) {
            setCenter({
                lat: (minMax.lat.max + minMax.lat.min) / 2,
                lng: (minMax.lng.max + minMax.lng.min) / 2,
            });
        }
    }, [minMax]);

    
    if (loadError) return "error loading maps";
    if (!isLoaded) return "LOADING";

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15} // default zoom level
            center= {center ? center : { lat: 27.316424, lng: 12.955319 }}
            options={options}
            onLoad={onMapLoad}
        ></ GoogleMap>
    );
};