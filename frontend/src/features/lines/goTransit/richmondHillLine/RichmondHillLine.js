import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchRichmondHillLine,
    getAllRichmondHillLines,
    getAllRichmondHillLinesStatus,
} from "./richmondHillLineSlice";

import { HTTP_STATUS, goLineRHLineColour } from "../../../../app/constants";

const LoadRichmondHillLine = () => {
    const dispatch = useDispatch();

    const richmondHillLine = useSelector(getAllRichmondHillLines);
    const richmondHillLineStatus = useSelector(getAllRichmondHillLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchRichmondHillLine());
    }, [dispatch]);

    console.log("RichmondHillLine", richmondHillLine, richmondHillLineStatus);

    return (
        <LayerGroup>
            {richmondHillLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : richmondHillLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineRHLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadRichmondHillLine;
