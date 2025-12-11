import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchLakeshoreWestLine,
    getAllLakeshoreWestLines,
    getAllLakeshoreWestLinesStatus,
} from "./lakeshoreWestLineSlice";

import { HTTP_STATUS, goLineLSWestLineColour } from "../../../../app/constants";

const LoadLakeshoreWestLine = () => {
    const dispatch = useDispatch();

    const lakeshoreWestLine = useSelector(getAllLakeshoreWestLines);
    const lakeshoreWestLineStatus = useSelector(getAllLakeshoreWestLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchLakeshoreWestLine());
    }, [dispatch]);

    console.log(
        "LakeshoreWestLine",
        lakeshoreWestLine,
        lakeshoreWestLineStatus
    );

    return (
        <LayerGroup>
            {lakeshoreWestLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : lakeshoreWestLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineLSWestLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadLakeshoreWestLine;
