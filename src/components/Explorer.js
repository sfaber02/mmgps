import { useState, useEffect } from "react";

import { Canvas } from "./Explorer-SubComponents/Canvas";

import "../styles/Explorer/explorer.scss"

const Explorer = ({ polygons }) => {
    const [coords, setCoords] = useState({});
    console.log(polygons);

    useEffect(() => {
        let path = polygons.getPath();
        let bounds = [];
        for (let i = 0; i < path.length; i++) {
            bounds.push({ lat: path.getAt(i).lat(), lng: path.getAt(i).lng() });
        }
        setCoords(bounds);
    }, [polygons]);

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
