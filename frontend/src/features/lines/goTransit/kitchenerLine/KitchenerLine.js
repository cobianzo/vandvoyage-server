import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchKitchenerLine,
    getAllKitchenerLines,
    getAllKitchenerLinesStatus,
} from "./kitchenerLineSlice";

import {
    HTTP_STATUS,
    goLineKitchenerLineColour,
} from "../../../../app/constants";

const LoadKitchenerLine = () => {
    const dispatch = useDispatch();

    const kitchenerLine = useSelector(getAllKitchenerLines);
    const kitchenerLineStatus = useSelector(getAllKitchenerLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchKitchenerLine());
    }, [dispatch]);

    console.log("KitchenerLine", kitchenerLine, kitchenerLineStatus);

    return (
        <LayerGroup>
            {kitchenerLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : kitchenerLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineKitchenerLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadKitchenerLine;
