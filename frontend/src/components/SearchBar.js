import React, { useState, useEffect } from "react";
import "../App.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllStations,
    getAllStationsStatus,
} from "../features/markers/stationsSlice.js";
import { useMap, useMapEvent } from "react-leaflet";

const SearchBar = (props) => {
    const map = useMap();
    const stations = useSelector(getAllStations);
    const [searchResults, setSearchResults] = useState(stations);
    const [currentValToSearch, setCurrentValToSearch] = useState("");
    const [currentlySearching, setCurrentlySearching] = useState(false);

    const enableZoomAndDrag = () => {
        map.scrollWheelZoom.enable();
        map.dragging.enable();
    };
    const disableZoomAndDrag = () => {
        map.scrollWheelZoom.disable();
        map.dragging.disable();
    };

    useMapEvent("click", (e) => {
        if (
            e.originalEvent.target.tagName !== "INPUT" &&
            e.originalEvent.target.tagName !== "LI"
        ) {
            setCurrentlySearching(false);
            enableZoomAndDrag();
        }
    });

    const search = (val) => {
        setCurrentValToSearch(val);
        disableZoomAndDrag();
        setSearchResults(
            stations.filter((station) => {
                return (
                    station.stationName.toLocaleLowerCase().indexOf(val) > -1
                );
            })
        );
    };

    const handleResultItemClick = (station) => {
        const stationLong = station.coordinates[0];
        const stationLat = station.coordinates[1];

        map.setZoom(14);
        map.panTo([stationLat, stationLong]);

        setCurrentValToSearch(station.stationName);
        setCurrentlySearching(false);
        enableZoomAndDrag();
    };

    const handleSearchBarFocus = (currentValToSearch) => {
        setCurrentlySearching(true);
        disableZoomAndDrag();
        search(currentValToSearch);
    };

    return (
        <div className="search-bar-container">
            <TextField
                sx={{ marginTop: 1 }}
                className="search-bar-input"
                label="Search stations..."
                rows={1}
                variant="outlined"
                value={currentValToSearch}
                onChange={(e) => search(e.target.value.toLocaleLowerCase())}
                onFocus={() => handleSearchBarFocus(currentValToSearch)}
            />
            {currentlySearching ? (
                <ul className="results">
                    {searchResults.map((station) => (
                        <li
                            className="search-results-item"
                            onClick={() => handleResultItemClick(station)}
                        >
                            {station.stationName}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default SearchBar;
