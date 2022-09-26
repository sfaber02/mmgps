import { useState, useEffect } from "react";

import { Canvas } from "./Explorer-SubComponents/Canvas";
import { Mask } from "./Explorer-SubComponents/Mask";
import { StaticMap } from "./Explorer-SubComponents/StaticMap";
import { mapContainerStyle } from "../mapConfig/explorer-config";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState([]);
    const [multiplier, setMultiplier] = useState(0);
    const [minMax, setMinMax] = useState({
        lat: { min: Infinity, max: -Infinity },
        lng: { min: Infinity, max: -Infinity },
    });
    const [polygonPath, setPolygonPath] = useState("");
    const [dimensions, setDimensions] = useState();

    useEffect(() => {
        let width =
            window.innerWidth *
            (Number(mapContainerStyle.width.split("v")[0]) / 100);
        let height =
            window.innerHeight *
            (Number(mapContainerStyle.height.split("v")[0]) / 100);
        setDimensions({width, height});
    }, []);

    window.onresize = () => {
        let width =
            window.innerWidth *
            (Number(mapContainerStyle.width.split("v")[0]) / 100);
        let height =
            window.innerHeight *
            (Number(mapContainerStyle.height.split("v")[0]) / 100);
        setDimensions({ width, height });
    };

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

    // finds coords min/ max and sets multiplier
    useEffect(() => {
        // get max/min lat and lng
        if (coords && dimensions) {
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
            setMinMax(tempMinMax);

            // determine total dimensions of shape by subtracting min from max
            const width = tempMinMax.lng.max - tempMinMax.lng.min;
            const height = tempMinMax.lat.max - tempMinMax.lat.min;

            console.log(width, height);

            //calculate multiplier to convert to new res
            // hard coded to 500x500 target res right now
            // find which has bigger span width or height
            // multiplier = bigger dimension / target res
            setMultiplier(width > height ? dimensions.width / width : dimensions.height / (height * 1.36));
        }
    }, [coords, dimensions]);

    return (
        <div className="explorer-container">
            {/* <Mask
                coords={coords}
                minMax={minMax}
                multiplier={multiplier}
                polygonPath={polygonPath}
                setPolygonPath={setPolygonPath}
            /> */}
            {/* <Canvas coords={coords} minMax={minMax} multiplier={multiplier} /> */}
            <StaticMap
                coords={coords}
                minMax={minMax}
                multiplier={multiplier}
                dimensions={dimensions}
                // polygonPath={polygonPath}
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
