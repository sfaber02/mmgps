import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { v4 as uuidv4 } from "uuid";



/**
 * Renders combobox for searching locations with suggestions
 * @param {function} panTo
 * @returns
 */
const Search = ({ panTo }) => {
    /**
     * Settings for useplaces autocomplete
     */
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 40.777955, lng: () => -73.96874 },
            radius: 200 * 1000,
        },
    });

    /**
     * takes in address from combobox and parses address into lat/lng coords
     * automatically pans the map to these coords
     * @param {string} address
     */
    const handleSelect = async (address) => {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (err) {
            alert(err);
        }
    };

    /**
     * sets value state for usePlacesAutoComplete hook
     */
    const handleInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Enter an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ id, description }) => (
                            <ComboboxOption
                                key={uuidv4()}
                                value={description}
                            />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export { Search };
