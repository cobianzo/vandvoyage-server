// // getting access to our model
import mongoose from "mongoose";
import { viaRailModel } from "../models/viaRail.model.js";

export const getViaRail = async (req, res) => {
    try {
        const viaRail = await viaRailModel.find();
        // status 200 means everythings okay
        res.status(200).json(viaRail);
    } catch (error) {
        console.error("Error in the getviaRail controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
