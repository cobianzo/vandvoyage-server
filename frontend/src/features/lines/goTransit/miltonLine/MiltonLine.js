import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchMiltonLine,
    getAllMiltonLines,
    getAllMiltonLinesStatus,
} from "./miltonLineSlice";

import { HTTP_STATUS, goLineMiltonLineColour } from "../../../../app/constants";

const LoadMiltonLine = () => {
    const dispatch = useDispatch();

    const miltonLine = useSelector(getAllMiltonLines);
    const miltonLineStatus = useSelector(getAllMiltonLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchMiltonLine());
    }, [dispatch]);

    console.log("MiltonLine", miltonLine, miltonLineStatus);

    return (
        <LayerGroup>
            {miltonLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : miltonLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineMiltonLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadMiltonLine;
