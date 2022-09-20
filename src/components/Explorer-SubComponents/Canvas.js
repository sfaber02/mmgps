import React, { useRef, useEffect, useState } from "react";

export const Canvas = ({ coords, minMax, multiplier }) => {
    console.log('canvas coords', coords);
    const canvasRef = useRef(null); // ref to hold canvas element

    const draw = (ctx) => {
        // ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        console.log("DRAW");
        let start = {
            x: (coords[0].lng - minMax.lng.min) * multiplier,
            // y dimension - ((lat - min Lat) * multiplier * (y dimension / original y dimension))
            y: 500 - ((coords[0].lat - minMax.lat.min) * multiplier * 1.36),
        };
        console.log('start', start);
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i < coords.length; i++) {
            let coord = {
                x: (coords[i].lng - minMax.lng.min) * multiplier,
                y: 500 - ((coords[i].lat - minMax.lat.min) * multiplier * 1.36),
            };
            console.log("coord", coord);
            ctx.lineTo(coord.x, coord.y);
        }
        ctx.lineTo(start.x, start.y);

        ctx.stroke();
    };

    useEffect(() => {
        if (coords && multiplier) {
            const canvas = canvasRef.current; // canvas element
            const context = canvas.getContext("2d"); // 2d canvas context

            draw(context);
        }
    }, [draw, coords, multiplier]);

    return <canvas className="explorer-canvas" width="500" height="500" ref={canvasRef} />;
};
