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
    lat: 40.777955,
    lng: -73.968740,
}

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
}

//POLYGON OPTIONS
const polyOptions = {
    fillColor: "lightblue",
    fillOpacity: .5,
    strokeColor: "white",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: true,
    geodesic: false,
    zIndex: 1
}

//DRAWING OPTIONS
const drawOptions = {
    drawingControlOptions: {
        drawingModes: ["polygon"],
        position: 'HELL NAH',
    },
    polygonOptions:{
        strokeColor: "red",
        fillColor: "blue",
    },
}


export {libraries, mapContainerStyle, center, options, polyOptions, drawOptions}