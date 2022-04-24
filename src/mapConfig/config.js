import mapStyle from './mapStyles.js'

const libraries = ['places'];

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
}


export {libraries, mapContainerStyle, center, options}