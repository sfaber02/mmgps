import React, { useState, useEffect, useRef } from "react";

export const Mask = ({ coords, minMax, multiplier, polygonPath, setPolygonPath }) => {
    
    const maskRef = useRef(null);

    useEffect(() => {
        if (coords && multiplier) {
            console.log("MASK");
            let tempPath = "";
            // x dimension = (lng - min lng) * multiplier
            let startX = (coords[0].lng - minMax.lng.min) * multiplier;
            // y dimension - (lat - min Lat) * multiplier * (y dimension / original y dimension))
            let startY =
                500 - (coords[0].lat - minMax.lat.min) * multiplier * 1.36;
            tempPath += `M ${startX} ${startY} `;

            // the rest of the coords
            for (let i = 1; i < coords.length; i++) {
                let tempX = (coords[i].lng - minMax.lng.min) * multiplier;
                let tempY =
                    500 - (coords[i].lat - minMax.lat.min) * multiplier * 1.36;
                tempPath += `L ${tempX} ${tempY} `;
            }
            // finish path
            tempPath += 'z';
            console.log(tempPath);
            
            setPolygonPath(tempPath);
        }
    }, [coords, multiplier, minMax]);

    useEffect(() => {
        if (polygonPath) {
            maskRef.current.style.clipPath = `path('${polygonPath}')`;
        }
    }, [polygonPath]);

    return <div className="explorer-mask" ref={maskRef} ></div>;
};



