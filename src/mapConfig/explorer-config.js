import { GoogleMap } from "@react-google-maps/api";
import mapStyle from "./mapStyles.js";

//Load Script Props
const libraries = ["places", "drawing"];

//MAP OPTIONS
const mapContainerStyle = {
    width: "100%",
    height: "85vh",
    // margin: "auto",
    // marginTop: "20px",
    class: "static-map-container",
};

const center = {
    lat: 40.777955,
    lng: -73.96874,
};

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: 'none',
    scrollwheel: false,
};

export {libraries, mapContainerStyle, center, options};