import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchTTCLineTwo,
    getAllTTCLineTwo,
    getAllTTCLineTwoStatus,
} from "./ttcLineTwoSlice";

import { HTTP_STATUS, ttcLineTwoColour } from "../../../../app/constants";

const LoadTTCLineTwo = () => {
    const dispatch = useDispatch();

    const ttcLineTwo = useSelector(getAllTTCLineTwo);
    const ttcLineTwoStatus = useSelector(getAllTTCLineTwoStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchTTCLineTwo());
    }, [dispatch]);

    console.log("ttcLineTwo", ttcLineTwo, ttcLineTwoStatus);

    return (
        <LayerGroup>
            {ttcLineTwoStatus !== HTTP_STATUS.FULFILLED
                ? null
                : ttcLineTwo.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={ttcLineTwoColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadTTCLineTwo;
