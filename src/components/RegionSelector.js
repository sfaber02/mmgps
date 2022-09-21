import React, { useCallback, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    DrawingManager,
} from "@react-google-maps/api";
import {
    options,
    libraries,
    mapContainerStyle,
    center,
    drawOptions,
} from "../mapConfig/region-selector-config";

import "../styles/map.css";
import "@reach/combobox/styles.css";
import { useNavigate } from "react-router-dom";

import { Locate } from "./RegionSelector-SubComponents/Locate";
import { Search } from "./RegionSelector-SubComponents/Search";
import { Explorer } from './Explorer';
import { Canvas } from "./Explorer-SubComponents/Canvas";

const GOOGLEMAPSKEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

/**
 * This component renders a dynamic map and allows the user to select an area by drawing a polygon
 * The polygon will be used to generate a static map for the explorer component
 * @param {object} props
 */
const RegionSelector = ({ polygons, setPolygons }) => {
    const mapRef = useRef();

    const navigate = useNavigate();

    /** loads all the google maps scripts */
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLEMAPSKEY,
        libraries,
    });

    /**
     * Sets the mapRef to the map when a new map is loaded
     * for saving current instance of the map
     */
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    /**
     * used for panning the map to a specific lat and lng
     */
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(18); // zoom level after pan
    }, []);

    /**
     * adds a completed polygon path to the polygon state
     * @param {object} polygon
     */
    const getPolygonPath = polygon => setPolygons(polygon);

    /** clears all polygons off the map */
    const resetMap = () => {
        polygons.setMap(null);
        setPolygons(null);
    };

    if (loadError) return "error loading maps";
    if (!isLoaded) return "LOADING";

    return (
        <div id="mapContainer">
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
            <button>Select Area</button>
            <button onClick={resetMap}>Reset</button>
            <button onClick={() => navigate("/explorer")}>
                Explore Region
            </button>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}  // default zoom level
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                <DrawingManager
                    onPolygonComplete={getPolygonPath}
                    drawingMode="polygon"
                    options={drawOptions}
                />
            </GoogleMap>
            <Explorer polygons={polygons} />
        </div>
    );
};

export { RegionSelector };
