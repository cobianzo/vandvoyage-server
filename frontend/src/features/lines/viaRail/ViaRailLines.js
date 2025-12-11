import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import {
    fetchViaRail,
    getAllViaRail,
    getAllViaRailStatus,
} from "./viaRailSlice";

import { HTTP_STATUS, viaRailLineColour } from "../../../app/constants";

const LoadViaRailLines = () => {
    const dispatch = useDispatch();
    const viaRail = useSelector(getAllViaRail);
    const viaRailStatus = useSelector(getAllViaRailStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchViaRail());
    }, [dispatch]);

    console.log("viaRail", viaRail, viaRailStatus);

    return (
        <LayerGroup>
            {viaRailStatus !== HTTP_STATUS.FULFILLED
                ? null
                : viaRail.map((rail, i) => (
                      <Polyline
                          key={i}
                          positions={[rail.coordinates]}
                          color={viaRailLineColour}
                      />
                  ))}
        </LayerGroup>
    );
};

export default LoadViaRailLines;
