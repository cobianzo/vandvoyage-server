import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import LoadGoStations from "./features/markers/GoStations";
import LoadViaRailStations from "./features/markers/ViaRailStations";
import { getAllBarrieLinesStatus } from "./features/lines/goTransit/barrieLine/barrieLineSlice";

import store from "./app/store";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";

import LoadTTCLines from "./features/lines/ttc/AllTTCLines";
import LoadTorontoBikeLanes from "./features/lines/torontoBikeRoutes/TorontoBikeRoutes";
import LoadViaRailLines from "./features/lines/viaRail/ViaRailLines";
import LoadGoLines from "./features/lines/goTransit/AllGoLines";
import LoadWaterlooIon from "./features/lines/waterlooIon/WaterlooION";

import "./App.css";
import LoadAllStations from "./features/markers/AllStations";
import LoadTTCStations from "./features/markers/TTCStations";
import LoadAmtrakStations from "./features/markers/AmtrakStations";

const App = () => {
    return (
        <>
            <MapContainer
                center={[49.095, -89.78]}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="All Stations">
                        <LoadAllStations />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Go Stations">
                        <LoadGoStations type="GO" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="TTC Stations">
                        <LoadTTCStations type="TTC" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Via Rail Stations">
                        <LoadViaRailStations type="VIA" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Amtrak Stations">
                        <LoadAmtrakStations type="Amtrak" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="TTC Lines">
                        <LoadTTCLines />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Toronto Bike Lanes">
                        <LoadTorontoBikeLanes />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Via Rail">
                        <LoadViaRailLines />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Go Lines">
                        <LoadGoLines />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Waterloo Ion">
                        <LoadWaterlooIon />
                    </LayersControl.Overlay>
                </LayersControl>
                <SearchBar></SearchBar>
                <Modal></Modal>
            </MapContainer>
        </>
    );
};

export default App;
