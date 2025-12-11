import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchTTCLineOne,
    getAllTTCLineOne,
    getAllTTCLineOneStatus,
} from "./ttcLineOneSlice";

import { HTTP_STATUS, ttcLineOneColour } from "../../../../app/constants";

const LoadTTCLineOne = () => {
    const dispatch = useDispatch();

    const ttcLineOne = useSelector(getAllTTCLineOne);
    const ttcLineOneStatus = useSelector(getAllTTCLineOneStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchTTCLineOne());
    }, [dispatch]);

    console.log("ttcLineOne", ttcLineOne, ttcLineOneStatus);

    return (
        <LayerGroup>
            {ttcLineOneStatus !== HTTP_STATUS.FULFILLED
                ? null
                : ttcLineOne.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={ttcLineOneColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadTTCLineOne;
