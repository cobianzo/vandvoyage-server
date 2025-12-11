import React from "react";

import { LayerGroup } from "react-leaflet";

import LoadWaterlooIonCurrent from "./waterlooIonCurrent/WaterlooIonCurrent";
import LoadWaterlooIonStage2 from "./waterlooIonStage2/WaterlooIonStage2";

const LoadTTCLines = () => {
    return (
        <LayerGroup>
            <LoadWaterlooIonCurrent />
            <LoadWaterlooIonStage2 />
        </LayerGroup>
    );
};

export default LoadTTCLines;
