import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import {
    fetchStouffvilleLine,
    getAllStouffvilleLines,
    getAllStouffvilleLinesStatus,
} from "./stouffvilleLineSlice";

import {
    HTTP_STATUS,
    goLineStouffvilleLineColour,
} from "../../../../app/constants";

const LoadStouffvilleLine = () => {
    const dispatch = useDispatch();

    const stouffvilleLine = useSelector(getAllStouffvilleLines);
    const stouffvilleLineStatus = useSelector(getAllStouffvilleLinesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchStouffvilleLine());
    }, [dispatch]);

    console.log("StouffvilleLine", stouffvilleLine, stouffvilleLineStatus);

    return (
        <LayerGroup>
            {stouffvilleLineStatus !== HTTP_STATUS.FULFILLED
                ? null
                : stouffvilleLine.map((goLine, i) =>
                      goLine.geometry.type === "LineString" ? (
                          <Polyline
                              key={i}
                              positions={[goLine.geometry.coordinates]}
                              color={goLineStouffvilleLineColour}
                          />
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadStouffvilleLine;
