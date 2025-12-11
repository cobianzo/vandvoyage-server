// // getting access to our model
import mongoose from "mongoose";
import { bikeRoutesModel } from "../models/bikeRoutes.model.js";

export const getBikeRoutes = async (req, res) => {
    try {
        const bikeRoutes = await bikeRoutesModel.find();
        // status 200 means everythings okay
        res.status(200).json(bikeRoutes);
    } catch (error) {
        console.error("Error in the getbikeRoutes controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
