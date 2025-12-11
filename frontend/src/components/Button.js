import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import WcIcon from "@mui/icons-material/Wc";
import SignalWifiBadIcon from "@mui/icons-material/SignalWifiBad";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import AccessibleIcon from "@mui/icons-material/Accessible";
import NotAccessibleIcon from "@mui/icons-material/NotAccessible";
import Stack from "@mui/material/Stack";
import { updateServices } from "../features/stationForm/stationFormSlice";

const initialState = {
    wifi: false,
    bathrooms: false,
    wheelchairAccess: false,
    food: false,
};

const IconLabelButtons = ({ updateServicesIncluded }) => {
    const [wifi, setWifi] = useState(false);
    const [bathrooms, setBathrooms] = useState(false);
    const [wheelchairAccess, setWheelchairAccess] = useState(false);
    const [food, setFood] = useState(false);

    useEffect(() => {
        updateServices();
    }, [wifi, bathrooms, wheelchairAccess, food]);

    const updateServices = () => {
        let serviceArr = [];
        if (wifi) serviceArr.push("wifi");
        if (bathrooms) serviceArr.push("bathrooms");
        if (food) serviceArr.push("food");
        if (wheelchairAccess) serviceArr.push("wheelchairAccess");

        updateServicesIncluded(serviceArr);
    };

    return (
        <div className="facilities-container">
            <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                spacing={1}
            >
                <Button
                    variant={wifi ? "contained" : "outlined"}
                    onClick={() => setWifi(!wifi)}
                    endIcon={wifi ? <CheckIcon /> : null}
                >
                    {/* {wifi ? <NetworkWifiIcon /> : <SignalWifiBadIcon />} */}
                    <NetworkWifiIcon />
                </Button>
                <Button
                    variant={bathrooms ? "contained" : "outlined"}
                    onClick={() => {
                        setBathrooms(!bathrooms);
                        updateServices();
                    }}
                    endIcon={bathrooms ? <CheckIcon /> : null}
                >
                    <WcIcon />
                </Button>
                <Button
                    variant={food ? "contained" : "outlined"}
                    onClick={() => {
                        setFood(!food);
                        updateServices();
                    }}
                    endIcon={food ? <CheckIcon /> : null}
                >
                    {/* {food ? <RestaurantIcon /> : <NoMealsIcon />} */}
                    <RestaurantIcon />
                </Button>
            </Stack>
            <Stack
                marginTop="10px"
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                spacing={2}
            >
                <Button
                    variant={wheelchairAccess ? "contained" : "outlined"}
                    onClick={() => {
                        setWheelchairAccess(!wheelchairAccess);
                        updateServices();
                    }}
                    endIcon={wheelchairAccess ? <CheckIcon /> : null}
                >
                    {/* {wheelchairAccess ? <AccessibleIcon /> : <NotAccessibleIcon />} */}
                    <AccessibleIcon />
                </Button>
            </Stack>
        </div>
    );
};

export default IconLabelButtons;
