import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchTTCLineThree,
    getAllTTCLineThree,
    getAllTTCLineThreeStatus,
} from "./ttcLineThreeSlice";

import { HTTP_STATUS, ttcLineThreeColour } from "../../../../app/constants";

const LoadTTCLineThree = () => {
    const dispatch = useDispatch();

    const ttcLineThree = useSelector(getAllTTCLineThree);
    const ttcLineThreeStatus = useSelector(getAllTTCLineThreeStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchTTCLineThree());
    }, [dispatch]);

    console.log("ttcLineThree", ttcLineThree, ttcLineThreeStatus);

    return (
        <LayerGroup>
            {ttcLineThreeStatus !== HTTP_STATUS.FULFILLED
                ? null
                : ttcLineThree.map((ttcLine, i) =>
                      ttcLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[ttcLine.geometry.coordinates]}
                              color={ttcLineThreeColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadTTCLineThree;
