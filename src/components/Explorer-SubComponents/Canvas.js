import React, {useRef, useEffect} from "react";

export const Canvas = (props) => {

    const canvasRef = useRef(null); // ref to hold canvas element

const draw = (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
};
    
    useEffect(() => {
        const canvas = canvasRef.current; // canvas element
        const context = canvas.getContext("2d"); // 2d canvas context

        draw(context); 

    }, [draw]);

    return <canvas ref={canvasRef} {...props} />;
};
