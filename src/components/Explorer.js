import { useState, useEffect } from "react";

import { Canvas } from "./Explorer-SubComponents/Canvas";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState({});
    console.log(polygons);

    useEffect(() => {
        if (polygons) {
            let path = polygons.getPath();
            let bounds = [];
            for (let i = 0; i < path.length; i++) {
                bounds.push({
                    lat: path.getAt(i).lat(),
                    lng: path.getAt(i).lng(),
                });
            }
            setCoords(bounds);
        }
    }, [polygons]);

    
    // determine total dimensions of shape by subtracting min from max
    // convert these into ratios to draw shape

    useEffect(() => {
        // get max/min lat and lng
        if (coords.length > 1) {
            let minMax = {
                lat: { min: Infinity, max: -Infinity },
                lng: { min: Infinity, max: -Infinity },
            };
            for (let coord of coords) {
                console.log(coord);
                if (coord.lat > minMax.lat.max) minMax.lat.max = coord.lat;
                if (coord.lat < minMax.lat.min) minMax.lat.min = coord.lat;
                if (coord.lng > minMax.lng.max) minMax.lng.max = coord.lng;
                if (coord.lng < minMax.lng.min) minMax.lng.min = coord.lng;
            }
            console.log(minMax);

            



        }
    }, [coords]);

    return (
        <>
            {coords.length > 0 ? (
                coords.map((e) => <p>{`lat: ${e.lat}  lng: ${e.lng}\n`}</p>)
            ) : (
                <p>No Polygons</p>
            )}
            <Canvas />
        </>
    );
};

export { Explorer };
