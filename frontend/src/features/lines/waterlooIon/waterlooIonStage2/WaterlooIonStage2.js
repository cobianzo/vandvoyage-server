import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchWaterlooIonStage2,
    getAllWaterlooIonStage2,
    getAllWaterlooIonStage2Status,
} from "./waterlooIonStage2Slice.js";

import {
    HTTP_STATUS,
    waterlooIonStage2LineColour,
} from "../../../../app/constants";

const LoadWaterlooIonStage2 = () => {
    const dispatch = useDispatch();

    const waterlooIonStage2 = useSelector(getAllWaterlooIonStage2);
    const waterlooIonStage2Status = useSelector(getAllWaterlooIonStage2Status);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchWaterlooIonStage2());
    }, [dispatch]);

    console.log(
        "WaterlooIonStage2",
        waterlooIonStage2,
        waterlooIonStage2Status
    );

    return (
        <LayerGroup>
            {waterlooIonStage2Status !== HTTP_STATUS.FULFILLED
                ? null
                : waterlooIonStage2.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={waterlooIonStage2LineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadWaterlooIonStage2;
