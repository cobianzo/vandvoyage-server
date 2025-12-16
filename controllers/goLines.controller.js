// // getting access to our model
import mongoose from "mongoose";
import {
    getGoLineBarrieModel,
    getGoLineKitchenerModel,
    getGoLineLSEastModel,
    getGoLineLSWestModel,
    getGoLineMiltonModel,
    getGoLineRHModel,
    getGoLineStouffvilleModel,
    getGoLineUPModel,
} from "../models/goLines.model.js";

export const getGoLineBarrie = async (req, res) => {
    try {
        const goLineBarrie = await getGoLineBarrieModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineBarrie);
    } catch (error) {
        console.error(
            "Error in the getgoLineBarrie controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineKitchener = async (req, res) => {
    try {
        const goLineKitchener = await getGoLineKitchenerModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineKitchener);
    } catch (error) {
        console.error(
            "Error in the getgoLineKitchener controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineLSEast = async (req, res) => {
    try {
        const goLineLSEast = await getGoLineLSEastModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineLSEast);
    } catch (error) {
        console.error(
            "Error in the getgoLineLSEast controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineLSWest = async (req, res) => {
    try {
        const goLineLSWest = await getGoLineLSWestModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineLSWest);
    } catch (error) {
        console.error(
            "Error in the getgoLineLSWest controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineMilton = async (req, res) => {
    try {
        const goLineMilton = await getGoLineMiltonModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineMilton);
    } catch (error) {
        console.error(
            "Error in the getgoLineMilton controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineRH = async (req, res) => {
    try {
        const goLineRH = await getGoLineRHModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineRH);
    } catch (error) {
        console.error("Error in the getgoLineRH controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineStouffville = async (req, res) => {
    try {
        const goLineStouffville = await getGoLineStouffvilleModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineStouffville);
    } catch (error) {
        console.error(
            "Error in the getgoLineStouffville controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};
export const getGoLineUP = async (req, res) => {
    try {
        const goLineUP = await getGoLineUPModel.find();
        // status 200 means everythings okay
        res.status(200).json(goLineUP);
    } catch (error) {
        console.error("Error in the getgoLineUP controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};
