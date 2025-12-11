import React, { useEffect } from "react";
import { Marker, LayerGroup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";

import LoadPopups from "../../components/Popups";
import {
    fetchStations,
    getAllStations,
    getAllStationsStatus,
} from "./stationsSlice.js";
import { fetchSpecificStation } from "../stationForm/stationFormSlice";
import { HTTP_STATUS } from "../../app/constants";

const LoadAllStations = () => {
    const dispatch = useDispatch();
    const stations = useSelector(getAllStations);
    const stationsStatus = useSelector(getAllStationsStatus);

    // if (stationsStatus !== HTTP_STATUS.FULFILLED) {
    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchStations());
    }, [dispatch]);
    // }

    console.log(`All Stations - `, stations, stationsStatus);

    return (
        <LayerGroup>
            {stationsStatus !== HTTP_STATUS.FULFILLED
                ? null
                : stations.map((station, i) => (
                      <Marker
                          key={station._id}
                          position={[
                              station.coordinates[1],
                              station.coordinates[0],
                          ]}
                          color={"red"}
                          eventHandlers={{
                              click: () => {
                                  dispatch(
                                      fetchSpecificStation({
                                          id: station._id,
                                      })
                                  );
                              },
                          }}
                      >
                          <LoadPopups station={station} />
                      </Marker>
                  ))}
        </LayerGroup>
    );
};

export default LoadAllStations;
