import React from "react";
import { Marker, LayerGroup } from "react-leaflet";
import LoadPopups from "../../components/Popups";
import { useDispatch, useSelector } from "react-redux";
import { getAllStations, getAllStationsStatus } from "./stationsSlice.js";

import { fetchSpecificStation } from "../stationForm/stationFormSlice";
import { HTTP_STATUS } from "../../app/constants";

const LoadAmtrakStations = ({ type }) => {
    const dispatch = useDispatch();
    const stations = useSelector(getAllStations);
    const stationsStatus = useSelector(getAllStationsStatus);

    console.log(`${type} - `, stations, stationsStatus);

    return (
        <LayerGroup>
            {stationsStatus !== HTTP_STATUS.FULFILLED
                ? null
                : stations.map((station, i) =>
                      station.serviceType.indexOf(type) > -1 ? (
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
                      ) : null
                  )}
        </LayerGroup>
    );
};

export default LoadAmtrakStations;
