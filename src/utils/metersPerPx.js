

// determine meters per px at a certain latitude
const generateMetersPerPx = (lat) => {
    
    const metersPerPx = {};
    for (let zoomLevel = 1; zoomLevel <= 23; zoomLevel++) {
        metersPerPx[zoomLevel] =
            (156543.03392 * Math.cos((lat * Math.PI) / 180)) /
            Math.pow(2, zoomLevel);
    }

    return metersPerPx;
}

export { generateMetersPerPx };