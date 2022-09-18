import React from "react";


const Explorer = ({ polygons }) => {
    console.log(polygons);

    return (
        <>
            {polygons.length > 0 ? (
                <p>
                    polygons
                    
                </p>
            ) : (
                <p>No Polygons</p>
            )}
        </>
    );
}

export { Explorer };