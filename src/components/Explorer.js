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
