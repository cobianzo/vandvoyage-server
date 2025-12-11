import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchWaterlooIonCurrent,
    getAllWaterlooIonCurrent,
    getAllWaterlooIonCurrentStatus,
} from "./waterlooIonCurrentSlice.js";

import {
    HTTP_STATUS,
    waterlooIonCurrentLineColour,
} from "../../../../app/constants";
import { create } from "@mui/material/styles/createTransitions";

const LoadWaterlooIonCurrent = () => {
    const dispatch = useDispatch();

    const waterlooIonCurrent = useSelector(getAllWaterlooIonCurrent);
    const waterlooIonCurrentStatus = useSelector(
        getAllWaterlooIonCurrentStatus
    );

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchWaterlooIonCurrent());
    }, [dispatch]);

    console.log(
        "WaterlooIonCurrent",
        waterlooIonCurrent,
        waterlooIonCurrentStatus
    );

    return (
        <LayerGroup>
            {waterlooIonCurrentStatus !== HTTP_STATUS.FULFILLED
                ? null
                : waterlooIonCurrent.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={waterlooIonCurrentLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadWaterlooIonCurrent;
