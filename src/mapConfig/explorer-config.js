import { GoogleMap } from "@react-google-maps/api";
import mapStyle from "./mapStyles.js";

//Load Script Props
const libraries = ["places", "drawing"];

//MAP OPTIONS
const mapContainerStyle = {
    width: "500px",
    height: "500px",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "10px",
};

const center = {
    lat: 40.777955,
    lng: -73.96874,
};

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,

};

export {libraries, mapContainerStyle, center, options};