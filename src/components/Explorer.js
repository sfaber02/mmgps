import { useState, useEffect } from "react";

import { Canvas } from "./Explorer-SubComponents/Canvas";
import { StaticMap } from "./Explorer-SubComponents/StaticMap";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState([]);
    const [multiplier, setMultiplier] = useState(0);
    const [minMax, setMinMax] = useState({
        lat: { min: Infinity, max: -Infinity },
        lng: { min: Infinity, max: -Infinity },
    });

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
         } else {
             setCoords(null);
         }
     }, [polygons]);

    // finds coords min/ max and sets multiplier
    useEffect(() => {
        // get max/min lat and lng
        if (coords) {
            const tempMinMax = {
                lat: { min: Infinity, max: -Infinity },
                lng: { min: Infinity, max: -Infinity },
            };
            for (let coord of coords) {
                // console.log(coord);
                if (coord.lat > tempMinMax.lat.max)
                    tempMinMax.lat.max = coord.lat;
                if (coord.lat < tempMinMax.lat.min)
                    tempMinMax.lat.min = coord.lat;
                if (coord.lng > tempMinMax.lng.max)
                    tempMinMax.lng.max = coord.lng;
                if (coord.lng < tempMinMax.lng.min)
                    tempMinMax.lng.min = coord.lng;
            }
            console.log("tempMinMax", tempMinMax);

            // determine total dimensions of shape by subtracting min from max
            const width = tempMinMax.lng.max - tempMinMax.lng.min;
            const height = tempMinMax.lat.max - tempMinMax.lat.min;
            setMinMax(tempMinMax);

            console.log(width, height);

            //calculate multiplier to convert to new res
            // hard coded to 500x500 target res right now
            setMultiplier(width > height ? 500 / width : 500 / height);
        }
    }, [coords]);

   

    return (
        <>
            <Canvas coords={coords} minMax={minMax} multiplier={multiplier} />
            <StaticMap
                coords={coords}
                minMax={minMax}
                multiplier={multiplier}
            />
            {coords ? (
                coords.map((e) => <p>{`lat: ${e.lat}  lng: ${e.lng}\n`}</p>)
            ) : (
                <p>No Polygons</p>
            )}
        </>
    );
};

export { Explorer };
