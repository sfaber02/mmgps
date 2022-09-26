// creates an SVG path for CSS clip path based off of GPS coords


export const generateSVGPath = (coords, minMax, multiplier, dimensions) => {

    console.log("MASK");

    console.log('minMax = ', minMax);

    let tempPath = "";
    // x dimension = (lng - min lng) * multiplier
    let startX = (coords[0].lng - minMax.lng.min) * multiplier;
    // y dimension - (lat - min Lat) * multiplier * (y dimension / original y dimension))
    let startY = dimensions.height - (coords[0].lat - minMax.lat.min) * multiplier * 1.36;
    tempPath += `M ${startX} ${startY} `;

    // the rest of the coords
    for (let i = 1; i < coords.length; i++) {
        let tempX = (coords[i].lng - minMax.lng.min) * multiplier;
        let tempY = dimensions.height - (coords[i].lat - minMax.lat.min) * multiplier * 1.36;
        tempPath += `L ${tempX} ${tempY} `;
    }
    // finish path
    tempPath += "z";
    console.log(tempPath);

    return tempPath;
};
