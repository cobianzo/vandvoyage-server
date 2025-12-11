import React, { useEffect } from "react";
import { Polyline, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import {
    fetchBikeRoutes,
    getAllBikeRoutes,
    getAllBikeRoutesStatus,
} from "./bikeRoutesSlice";

import { HTTP_STATUS, torontoBikeLineColour } from "../../../app/constants";

const LoadTorontoBikeLanes = () => {
    const dispatch = useDispatch();
    const bikeRoutes = useSelector(getAllBikeRoutes);
    const bikeRoutesStatus = useSelector(getAllBikeRoutesStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchBikeRoutes());
    }, [dispatch]);

    console.log("BikesRoutes", bikeRoutes, bikeRoutesStatus);

    return (
        <LayerGroup>
            {bikeRoutesStatus !== HTTP_STATUS.FULFILLED
                ? null
                : bikeRoutes.map((route, i) =>
                      route.coordinates.map((coords, ii) => (
                          <Polyline
                              key={ii}
                              positions={[coords]}
                              color={torontoBikeLineColour}
                          />
                      ))
                  )}
        </LayerGroup>
    );
};

export default LoadTorontoBikeLanes;
