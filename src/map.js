import React from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";


const Map = () => {
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 40.777955, lng: -73.968740 }}
        />
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export { WrappedMap };