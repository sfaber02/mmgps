import React, { useRef, useEffect } from "react";

export const Canvas = ({ coords }) => {
    console.log('canvas coords', coords);
    const canvasRef = useRef(null); // ref to hold canvas element

    const draw = (ctx) => {
        // ctx.fillStyle = "#FFFFFF";
        // ctx.beginPath();
        // console.log("DRAW");
        // let start = {
        //     x: (coords[0].lng * 500) / 360,
        //     y: (coords[0].lat * 500) / 180,
        // };
        // console.log('start', start);
        // ctx.moveTo(start.x, start.y);
        // for (let i = 1; i < coords.length; i++) {
        //     let coord = {
        //         x: (coords[i].lng * 500) / 360,
        //         y: (coords[i].lat * 500) / 180,
        //     };
        //     console.log("coord", coord);
        //     ctx.lineTo(coord.x, coord.y);
        // }
        // ctx.lineTo(start.x, start.y);
        ctx.lineTo(300, 300);
        ctx.lineTo(150, 150);
        ctx.stroke();
    };

    useEffect(() => {
        if (coords.length > 1) {
            const canvas = canvasRef.current; // canvas element
            const context = canvas.getContext("2d"); // 2d canvas context

            draw(context);
        }
    }, [draw, coords]);

    return <canvas className="explorer-canvas" width="500" height="500" ref={canvasRef} />;
};
