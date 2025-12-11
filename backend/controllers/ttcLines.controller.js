// // getting access to our model
import mongoose from "mongoose";
import {
    ttcLineOneModel,
    ttcLineTwoModel,
    ttcLineThreeModel,
    ttcLineFourModel,
} from "../models/ttcLines.model.js";

export const getTTCLineOne = async (req, res) => {
    try {
        const ttcLineOne = await ttcLineOneModel.find();
        // status 200 means everythings okay
        res.status(200).json(ttcLineOne);
    } catch (error) {
        console.error("Error in the getttcLineOne controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
export const getTTCLineTwo = async (req, res) => {
    try {
        const ttcLineTwo = await ttcLineTwoModel.find();
        // status 200 means everythings okay
        res.status(200).json(ttcLineTwo);
    } catch (error) {
        console.error("Error in the getttcLineTwo controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
export const getTTCLineThree = async (req, res) => {
    try {
        const ttcLineThree = await ttcLineThreeModel.find();
        // status 200 means everythings okay
        res.status(200).json(ttcLineThree);
    } catch (error) {
        console.error(
            "Error in the getttcLineThree controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getTTCLineFour = async (req, res) => {
    try {
        const ttcLineFour = await ttcLineFourModel.find();
        // status 200 means everythings okay
        res.status(200).json(ttcLineFour);
    } catch (error) {
        console.error(
            "Error in the getttcLineFour controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
