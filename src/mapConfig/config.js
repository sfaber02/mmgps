import { GoogleMap } from '@react-google-maps/api';
import mapStyle from './mapStyles.js'

//Load Script Props
const libraries = ['places', 'drawing'];


//MAP OPTIONS
const mapContainerStyle = {
    width: '90vw',
    height: '85vh',
    margin: 'auto',
    marginTop: '20px',
    borderRadius: '10px',
}

const center = {
    lat: 0, // 40.777955,
    lng: 0 // -73.968740,
}

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
}

//DRAWING OPTIONS
const drawOptions = {
   drawingControlOptions: {
      drawingModes: ["polygon"],
      position: "HELL NAH",
   },
   polygonOptions: {
      fillColor: "lightblue",
      fillOpacity: 0.5,
      strokeColor: "blue",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
   },
};


export {libraries, mapContainerStyle, center, options, drawOptions};