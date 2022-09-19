import React, { useRef, useEffect, useState } from "react";

export const Canvas = ({ coords }) => {
    console.log('canvas coords', coords);
    const canvasRef = useRef(null); // ref to hold canvas element

    const [multiplier, setMultiplier] = useState(0);
    const [minMax, setMinMax] = useState({
        lat: { min: Infinity, max: -Infinity },
        lng: { min: Infinity, max: -Infinity },
    });

      useEffect(() => {
          // get max/min lat and lng
          if (coords.length > 1) {
              const tempMinMax = {
                  lat: { min: Infinity, max: -Infinity },
                  lng: { min: Infinity, max: -Infinity },
              };
              for (let coord of coords) {
                  // console.log(coord);
                  if (coord.lat > tempMinMax.lat.max) tempMinMax.lat.max = coord.lat;
                  if (coord.lat < tempMinMax.lat.min) tempMinMax.lat.min = coord.lat;
                  if (coord.lng > tempMinMax.lng.max) tempMinMax.lng.max = coord.lng;
                  if (coord.lng < tempMinMax.lng.min) tempMinMax.lng.min = coord.lng;
              }
              console.log("tempMinMax", tempMinMax);

              // determine total dimensions of shape by subtracting min from max
              const width = tempMinMax.lng.max - tempMinMax.lng.min;
              const height = tempMinMax.lat.max - tempMinMax.lat.min;
              setMinMax(tempMinMax);

              console.log(width, height);

              //calculate multiplier to convert to new res
              // hard coded to 500x500 target res right now
              setMultiplier(width > height ? 500 / width : 500 / height);

          }
      }, [coords]);


    const draw = (ctx) => {
        // ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        console.log("DRAW");
        let start = {
            x: (coords[0].lng - minMax.lng.min) * multiplier,
            y: (coords[0].lat -minMax.lat.min) * multiplier,
        };
        console.log('start', start);
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i < coords.length; i++) {
            let coord = {
                x: (coords[i].lng - minMax.lng.min) * multiplier,
                y: (coords[i].lat - minMax.lat.min) * multiplier,
            };
            console.log("coord", coord);
            ctx.lineTo(coord.x, coord.y);
        }
        ctx.lineTo(start.x, start.y);
        // ctx.lineTo(300, 300);
        // ctx.lineTo(150, 150);
        ctx.stroke();
    };

    useEffect(() => {
        if (coords.length > 1 && multiplier) {
            const canvas = canvasRef.current; // canvas element
            const context = canvas.getContext("2d"); // 2d canvas context

            draw(context);
        }
    }, [draw, coords, multiplier]);

    return <canvas className="explorer-canvas" width="500" height="500" ref={canvasRef} />;
};
