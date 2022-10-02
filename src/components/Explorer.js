import { useState, useEffect } from "react";

import { StaticMap } from "./Explorer-SubComponents/StaticMap";
import { mapContainerStyle } from "../mapConfig/explorer-config";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState([]);
    const [multiplier, setMultiplier] = useState(0);
    const [offset, setOffset] = useState(null);
    const [minMax, setMinMax] = useState({
        lat: { min: Infinity, max: -Infinity },
        lng: { min: Infinity, max: -Infinity },
    });
    const [dimensions, setDimensions] = useState();

    // turn polygon path from google maps API into lat, lng coords
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
        } else {
            setCoords(null);
        }
    }, [polygons]);

    useEffect(() => {
        // find width and height in pixels based on window size and mapContainer CSS size
        let width =
            window.innerWidth *
            (Number(mapContainerStyle.width.split("v")[0]) / 100);
        let height =
            window.innerHeight *
            (Number(mapContainerStyle.height.split("v")[0]) / 100);
        setDimensions({ width, height });
    }, []);

    window.onresize = () => {
        // set new dimensions if window is resized
        let width =
            window.innerWidth *
            (Number(mapContainerStyle.width.split("v")[0]) / 100);
        let height =
            window.innerHeight *
            (Number(mapContainerStyle.height.split("v")[0]) / 100);
        setDimensions({ width, height });
    };

    // finds coords min/ max and sets scaling multiplier
    useEffect(() => {
        // get max/min lat and lng
        if (coords && dimensions) {
            const tempMinMax = {
                lat: { min: Infinity, max: -Infinity },
                lng: { min: Infinity, max: -Infinity },
            };
            for (let coord of coords) {
                if (coord.lat > tempMinMax.lat.max)
                    tempMinMax.lat.max = coord.lat;
                if (coord.lat < tempMinMax.lat.min)
                    tempMinMax.lat.min = coord.lat;
                if (coord.lng > tempMinMax.lng.max)
                    tempMinMax.lng.max = coord.lng;
                if (coord.lng < tempMinMax.lng.min)
                    tempMinMax.lng.min = coord.lng;
            }
            setMinMax(tempMinMax);

            // determine total dimensions of shape by subtracting min from max
            const width = tempMinMax.lng.max - tempMinMax.lng.min;
            const height = tempMinMax.lat.max - tempMinMax.lat.min;

            //calculate multiplier to convert to new res
            // find which has bigger span width or height
            // multiplier = target res / bigger dimension
            setMultiplier(
                width / dimensions.width > (height / dimensions.height) * 1.36
                    ? dimensions.width / width
                    : dimensions.height / (height * 1.36)
            );
        }
    }, [coords, dimensions]);

    // set offset for smaller polygon dimension
    // used to center polygon on canvas
    useEffect(() => {
        if (coords && dimensions && multiplier) {
            const width = minMax.lng.max - minMax.lng.min;
            const height = minMax.lat.max - minMax.lat.min;
    
            setOffset(
                width / dimensions.width > (height / dimensions.height) * 1.36
                    ? { height: (dimensions.height - height * 1.36 * multiplier) / 2, width: 0 }
                    : { width: (dimensions.width - width * multiplier) / 2, height: 0 }
            );
        }
    }, [coords, dimensions, multiplier]);

    return (
        <div className="explorer-container">
            <StaticMap
                coords={coords}
                minMax={minMax}
                multiplier={multiplier}
                dimensions={dimensions}
                offset={offset}
            />
            {coords ? (
                coords.map((e) => <p>{`lat: ${e.lat}  lng: ${e.lng}\n`}</p>)
            ) : (
                <p>No Polygons</p>
            )}
        </div>
    );
};

export { Explorer };
