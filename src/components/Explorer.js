import { useState, useEffect } from "react";

import { Canvas } from "./Explorer-SubComponents/Canvas";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState([]);
        
    useEffect(() => {
        if (polygons) {
            
            let path = polygons.getPath();
            let bounds = [];
            for (let i = 0; i < path.length; i++) {
                bounds.push({
                    lat: path.getAt(i).lat() + 90, // convert coords to only postive nums
                    lng: path.getAt(i).lng() + 180, // convert coords to only positive
                });
            }
            setCoords(bounds);
        }
    }, [polygons]);

    
   
    // convert these into ratios to draw shape

    useEffect(() => {
        // get max/min lat and lng
        if (coords.length > 1) {
            const minMax = {
                lat: { min: Infinity, max: -Infinity },
                lng: { min: Infinity, max: -Infinity },
            };
            for (let coord of coords) {
                // console.log(coord);
                if (coord.lat > minMax.lat.max)
                    minMax.lat.max = coord.lat;
                if (coord.lat < minMax.lat.min)
                    minMax.lat.min = coord.lat;
                if (coord.lng > minMax.lng.max)
                    minMax.lng.max = coord.lng;
                if (coord.lng < minMax.lng.min)
                    minMax.lng.min = coord.lng;
            }
            console.log('minMax', minMax);

            // determine total dimensions of shape by subtracting min from max
            const width = minMax.lng.max - minMax.lng.min;
            const height = minMax.lat.max - minMax.lat.min;
            console.log(width, height);


        }
    }, [coords]);

    return (
        <>
            {coords.length > 0 ? (
                coords.map((e) => <p>{`lat: ${e.lat}  lng: ${e.lng}\n`}</p>)
            ) : (
                <p>No Polygons</p>
            )}
            <Canvas coords={coords} />
        </>
    );
};

export { Explorer };
