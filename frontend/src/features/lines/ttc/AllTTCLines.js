import React from "react";

import LoadTTCLineOne from "./ttcLineOne/TTCLineOne";
import LoadTTCLineTwo from "./ttcLineTwo/TTCLineTwo";
import LoadTTCLineThree from "./ttcLineThree/TTCLineThree";
import LoadTTCLineFour from "./ttcLineFour/TTCLineFour";
import { LayerGroup } from "react-leaflet";

const LoadTTCLines = () => {
    return (
        <LayerGroup>
            <LoadTTCLineOne />
            <LoadTTCLineTwo />
            <LoadTTCLineThree />
            <LoadTTCLineFour />
        </LayerGroup>
    );
};

export default LoadTTCLines;
