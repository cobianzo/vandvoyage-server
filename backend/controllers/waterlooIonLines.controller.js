// // getting access to our model
import mongoose from "mongoose";

import {
    waterlooIonLineModel,
    waterlooIonLineStageTwoModel,
} from "../models/waterlooIonLines.model.js";

export const getWaterlooIonLine = async (req, res) => {
    try {
        const waterlooIonLine = await waterlooIonLineModel.find();
        // status 200 means everythings okay
        res.status(200).json(waterlooIonLine);
    } catch (error) {
        console.error(
            "Error in the waterlooIonLine controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getWaterlooIonLineStageTwo = async (req, res) => {
    try {
        const waterlooIonLineStageTwo =
            await waterlooIonLineStageTwoModel.find();
        // status 200 means everythings okay
        res.status(200).json(waterlooIonLineStageTwo);
    } catch (error) {
        console.error(
            "Error in the getwaterlooIonLineStageTwo controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
