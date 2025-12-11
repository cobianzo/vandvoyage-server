import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchTTCLineFour,
    getAllTTCLineFour,
    getAllTTCLineFourStatus,
} from "./ttcLineFourSlice";

import { HTTP_STATUS, ttcLineFourColour } from "../../../../app/constants";

const LoadTTCLineFour = () => {
    const dispatch = useDispatch();

    const ttcLineFour = useSelector(getAllTTCLineFour);
    const ttcLineFourStatus = useSelector(getAllTTCLineFourStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchTTCLineFour());
    }, [dispatch]);

    console.log("ttcLineFour", ttcLineFour, ttcLineFourStatus);

    return (
        <LayerGroup>
            {ttcLineFourStatus !== HTTP_STATUS.FULFILLED
                ? null
                : ttcLineFour.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={ttcLineFourColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadTTCLineFour;
