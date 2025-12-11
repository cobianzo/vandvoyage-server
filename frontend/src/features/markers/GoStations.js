import React from "react";
import { Marker, LayerGroup, useMap } from "react-leaflet";
import LoadPopups from "../../components/Popups";
import { useDispatch, useSelector } from "react-redux";
import { getAllStations, getAllStationsStatus } from "./stationsSlice";
import { fetchSpecificStation } from "../stationForm/stationFormSlice";
import { HTTP_STATUS } from "../../app/constants";

const LoadGoStations = ({ type }) => {
    const dispatch = useDispatch();
    const stations = useSelector(getAllStations);
    const stationsStatus = useSelector(getAllStationsStatus);
    const map = useMap();

    // Need to update colours to different icons in constant file.
    // const getMarkerColour = (type) => {
    //     let colour = "blue";
    //     if (type === "GO") colour = stationsColours;
    //     if (type === "VIA") colour = viaRailStationColours;
    //     if (type === "Amtrak") colour = amtrakStationColours;
    //     if (type === "TTC") colour = TTCColours;
    //     return colour;
    // };
    // const markerColour = getMarkerColour(type);

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
                                      //   map.setZoom(14);
                                      //   map.panTo([
                                      //       station.coordinates[1],
                                      //       station.coordinates[0],
                                      //   ]);
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

export default LoadGoStations;
