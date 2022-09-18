/**
 * requests users current location based on browser location data and pans map to those coords
 * @param {function} panTo function for panning map to new coords
 * @returns
 */
const Locate = ({ panTo }) => {
    return (
        <button
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    (err) => console.log(err)
                );
            }}
        >
            Locate
        </button>
    );
};

export { Locate };