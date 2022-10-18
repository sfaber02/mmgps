import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {
    libraries,
    mapContainerStyle,
    options,
} from "../../mapConfig/explorer-config";
import { generateSVGPath } from "../../utils/polygonSVGgenerator";

const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export const StaticMap = ({
    coords,
    minMax,
    multiplier,
    canvasDimensions,
    setMap,
    offset,
    zoomLevel,
    scale,
}) => {
    const [center, setCenter] = useState(null);

    const mapRef = useRef();
    const staticMapRef = useRef(null);

    /** loads all the google maps scripts */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    });

    useEffect(() => {
        console.log('staticmapref', staticMapRef.current);
        setMap(staticMapRef);
    }, [staticMapRef]);

    useEffect(() => {
        if (minMax) {
            setCenter({
                lat: (minMax.lat.max + minMax.lat.min) / 2,
                lng: (minMax.lng.max + minMax.lng.min) / 2,
            });
        }
    }, [minMax]);

    // generate clip path based on coords and map container canvasDimensions
    useEffect(() => {
        if (staticMapRef.current && coords && minMax && multiplier && offset) {
            staticMapRef.current.style.clipPath = `path('${generateSVGPath(
                coords,
                minMax,
                multiplier,
                canvasDimensions,
                offset,
                scale
            )}')`;
        }
    }, [coords, minMax, multiplier, canvasDimensions, offset]);

    // if (loadError) return "error loading maps";
    // if (!isLoaded) return "LOADING";

    return (
        <div className="static-map-container" ref={staticMapRef}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoomLevel} // default zoom level
                center={center ? center : { lat: 27.316424, lng: 12.955319 }}
                options={options}
                // onLoad={onMapLoad}
            ></GoogleMap>
        </div>
    );
};
