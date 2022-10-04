// creates an SVG path for CSS clip path based off of GPS coords

export const generateSVGPath = (
    coords,
    minMax,
    multiplier,
    dimensions,
    offset,
    scale
) => {
    let tempPath = "";
    // x dimension = (lng - min lng) * multiplier + offset
    let startX = ((coords[0].lng - minMax.lng.min) * multiplier + offset.width) * scale;
    // y dimension - (lat - min Lat) * multiplier * (y dimension / original y dimension)) - offset
    let startY =
        (dimensions.height -
        (coords[0].lat - minMax.lat.min) * multiplier * 1.36 -
        offset.height) * scale;
    tempPath += `M ${startX} ${startY} `;
    // the rest of the coords
    for (let i = 1; i < coords.length; i++) {
        let tempX =
            ((coords[i].lng - minMax.lng.min) * multiplier + offset.width) * scale;
        let tempY =
            (dimensions.height -
            (coords[i].lat - minMax.lat.min) * multiplier * 1.36 -
            offset.height) * scale;
        tempPath += `L ${tempX} ${tempY} `;
    }
    // finish path
    tempPath += "z";

    return tempPath;
};
