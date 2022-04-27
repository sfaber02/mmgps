import React from "react";
import { useLocation } from "react-router-dom";

const Explorer = () => {
    const { state } = useLocation();
    const [polygons] = JSON.parse(state.polygons);

    return <p>{polygons.Gd.map(coord => `${coord.lat}, ${coord.lng},  `)}</p>;
}

export { Explorer };