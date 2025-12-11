import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchUnionPearsonLine,
    getAllUnionPearsonLines,
    getAllUnionPearsonLinesStatus,
} from "./unionPearsonLineSlice";

import {
    HTTP_STATUS,
    goLineUnionPearsonLineColour,
} from "../../../../app/constants";

const LoadUnionPearsonLine = () => {
    const dispatch = useDispatch();

    const unionPearsonLine = useSelector(getAllUnionPearsonLines);
    const unionPearsonLineStatus = useSelector(getAllUnionPearsonLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchUnionPearsonLine());
    }, [dispatch]);

    console.log("UnionPearsonLine", unionPearsonLine, unionPearsonLineStatus);

    return (
        <LayerGroup>
            {unionPearsonLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : unionPearsonLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineUnionPearsonLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadUnionPearsonLine;
