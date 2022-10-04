import { useState, useEffect } from "react";

import { StaticMap } from "./Explorer-SubComponents/StaticMap";
import { mapContainerStyle } from "../mapConfig/explorer-config";
import { generateMetersPerPx } from "../utils/metersPerPx";

import "../styles/Explorer/explorer.scss";

const Explorer = ({ polygons }) => {
    // decimal degree coordinates from google maps polygon
    const [coords, setCoords] = useState([]);
    // multiplier to convert gps coord into pixel coord
    const [multiplier, setMultiplier] = useState(0);
    // pixel offset for smaller polygon dimension (to center polygon on canvas)
    const [offset, setOffset] = useState(null);
    // min / max decimal degree coords
    const [minMax, setMinMax] = useState({
        lat: { min: Infinity, max: -Infinity },
        lng: { min: Infinity, max: -Infinity },
    });
    // dimensions of map canvas in pixels {width: w in px, height: h in px}
    const [dimensions, setDimensions] = useState();
    // distance polygon spans in meters {lng: width in m, lat: height in m}
    const [distance, setDistance] = useState();
    // meters per px at each zoom level based on average latitude
    const [metersPerPx, setMetersPerPx] = useState();
    // min zoomLevel to see entire shape
    const [zoomLevel, setZoomLevel] = useState(1);
    // stores max meters w x h at current canvas size {width: max width in M, height: max H in M}
    const [maxMeters, setMaxMeters] = useState();
    // scale for polygon based on zoomLevel and distance
    const [scale, setScale] = useState(1);

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

    const resetDimensions = () => {
        // find width and height in pixels based on window size and mapContainer CSS size
        let width =
            window.innerWidth *
            (Number(mapContainerStyle.width.split("v")[0]) / 100);
        let height =
            window.innerHeight *
            (Number(mapContainerStyle.height.split("v")[0]) / 100);
        setDimensions({ width, height });
    };

    // set dimensions on load and window resize
    useEffect(() => resetDimensions(), []);
    window.onresize = () => resetDimensions();

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

    // sets distance in meters of polygon also sets metersPerPx based on average LAT
    useEffect(() => {
        if (minMax.lng.max !== -Infinity) {
            const width = minMax.lng.max - minMax.lng.min;
            const height = minMax.lat.max - minMax.lat.min;
            console.log(width, height);

            const latDistance = height * (10000 / 90) * 1000;
            const lngDistance =
                Math.abs(
                    width *
                        (Math.cos((minMax.lat.max + minMax.lat.min) / 2) * 111)
                ) * 1000;
            console.log(
                "height distance in m",
                latDistance,
                "width distance in m",
                lngDistance
            );
            setDistance({ lat: latDistance, lng: lngDistance });
            
            setMetersPerPx(
                generateMetersPerPx((minMax.lat.max + minMax.lat.min) / 2)
            );
        }
    }, [coords, minMax]);

    //determines zoom level based on metersPerPX, distance, and dimensions
    useEffect(() => {
        if (metersPerPx && distance && dimensions) {
           // go through zoom levels backwards to find the first level that will
           // contain the polygon
            for (let zLevel = 22; zLevel >= 1; zLevel--) {
                const widthInMeters = metersPerPx[zLevel].lng * dimensions.width; 
                const heightInMeters = metersPerPx[zLevel].lng * dimensions.height;
                if (widthInMeters >= distance.lng && heightInMeters >= distance.lat) {
                    console.log ('canvas width in M=', widthInMeters, 'canvas height in m', heightInMeters);
                    setZoomLevel(zLevel);
                    setMaxMeters({width: widthInMeters, height: heightInMeters});
                    break;
                }
           } 
        }
    }, [metersPerPx, distance, dimensions]);

    // sets scale for polygon clip path
    // based on  distance state and maxMeters state
    useEffect(() => {
        if (maxMeters && distance) {
            let widthScale = distance.lng / maxMeters.width;
            let heightScale = distance.lat / maxMeters.height;
            console.log ('widthScale=', widthScale, 'heightScale=', heightScale);
            setScale(widthScale >= heightScale ? widthScale : heightScale);
        }
    }, [maxMeters, distance]);

    // set offset for smaller polygon dimension
    // used to center polygon on canvas
    useEffect(() => {
        if (coords && dimensions && multiplier && scale && metersPerPx) {
            const width = minMax.lng.max - minMax.lng.min;
            const height = minMax.lat.max - minMax.lat.min;
            // setOffset(
            //     width / dimensions.width > (height / dimensions.height) * 1.36
            //         ? {
            //               height:
            //                  (dimensions.height - ((height * 1.36 * multiplier) * scale)) /
            //                   2,
            //               width: 0 //(dimensions.width - (dimensions.width * scale)) / 2,
            //           }
            //         : {
            //               width: (dimensions.width - width * multiplier) / 2,
            //               height: 0 //-(dimensions.height - (dimensions.height * scale)) / 2,
            //           }
            // );

            setOffset({
                height:
                    -(dimensions.height - height * 1.36 * multiplier * scale) /
                    1.36,
                width: (dimensions.width - width * multiplier * scale) / 1.36,
            });

        }
    }, [coords, dimensions, multiplier, zoomLevel, maxMeters, scale, metersPerPx]);

    return (
        <div className="explorer-container">
            <StaticMap
                coords={coords}
                minMax={minMax}
                multiplier={multiplier}
                dimensions={dimensions}
                offset={offset}
                zoomLevel={zoomLevel}
                scale={scale}
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
