import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";

import {
    fetchLakeshoreEastLine,
    getAllLakeshoreEastLines,
    getAllLakeshoreEastLinesStatus,
} from "./lakeshoreEastLineSlice";

import { HTTP_STATUS, goLineLSEastLineColour } from "../../../../app/constants";

const LoadLakeshoreEastLine = () => {
    const dispatch = useDispatch();

    const lakeshoreEastLine = useSelector(getAllLakeshoreEastLines);
    const lakeshoreEastLineStatus = useSelector(getAllLakeshoreEastLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchLakeshoreEastLine());
    }, [dispatch]);

    console.log(
        "LakeshoreEastLine",
        lakeshoreEastLine,
        lakeshoreEastLineStatus
    );

    return (
        <LayerGroup>
            {lakeshoreEastLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : lakeshoreEastLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineLSEastLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadLakeshoreEastLine;
