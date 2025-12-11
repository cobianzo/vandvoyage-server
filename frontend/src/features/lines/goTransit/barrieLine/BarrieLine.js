import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";

import {
    fetchBarrieLine,
    getAllBarrieLines,
    getAllBarrieLinesStatus,
} from "./barrieLineSlice";

import { HTTP_STATUS, goLineBarrieLineColour } from "../../../../app/constants";

const LoadBarrieLine = () => {
    const dispatch = useDispatch();

    const barrieLine = useSelector(getAllBarrieLines);
    const barrieLineStatus = useSelector(getAllBarrieLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchBarrieLine());
    }, [dispatch]);

    console.log("barrieLine", barrieLine, barrieLineStatus);

    return (
        <LayerGroup>
            {barrieLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : barrieLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineBarrieLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadBarrieLine;
