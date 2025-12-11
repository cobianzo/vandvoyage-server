// // getting access to our model
import mongoose from "mongoose";
import { stationModel } from "../models/stations.model.js";

export const getStations = async (req, res) => {
    try {
        const stations = await stationModel.find();
        // status 200 means everythings okay
        res.status(200).json(stations);
    } catch (error) {
        console.error("Error in the getStations controller: ", error.message);
        res.status(404).json({ message: error.message });
    }
};

export const getSpecificStation = async (req, res) => {
    try {
        const { id } = req.params;
        const stationNotes = await stationModel.findById(id);
        res.status(200).json(stationNotes);
    } catch (error) {
        console.error(
            "Error in the getSpecificStation controller: ",
            error.message
        );
        res.status(404).json({ message: error.message });
    }
};

// update post controller
export const updateStationInfo = async (req, res) => {
    // extracting id from req.params
    const { id } = req.params;
    const updatedStationInfo = req.body;

    // ("updatedStationInfo", updatedStationInfo);

    // checking if the id is valid in the mongoose db, if it's not valid just return a status saying nothings returned
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    stationModel.findById(id, function (err, station) {
        if (station.length === 0) return res.json();
        const existingNotes = station.notes;
        const existingSanitaryRatings = station.sanitaryRating;
        const existingSafetyRatings = station.safetyRating;
        const existingServicesIncluded = station.services;
        if (updatedStationInfo.type !== "DELETE") {
            const NewNote = {
                _id: mongoose.Types.ObjectId(),
                note: updatedStationInfo.note,
            };

            station.likeCount =
                station.likeCount + (updatedStationInfo.stationLiked ? 1 : 0);
            station.dislikeCount =
                station.dislikeCount +
                (updatedStationInfo.stationDisliked ? 1 : 0);

            updatedStationInfo.servicesIncluded.forEach((element) => {
                existingServicesIncluded.indexOf(element) === -1
                    ? existingServicesIncluded.push(element)
                    : null;
            });

            if (updatedStationInfo.sanitaryRating)
                existingSanitaryRatings.push(updatedStationInfo.sanitaryRating);
            if (updatedStationInfo.safetyRating)
                existingSafetyRatings.push(updatedStationInfo.safetyRating);
            if (updatedStationInfo.note) existingNotes.push(NewNote);
        } else {
            const noteId = updatedStationInfo.noteId;

            existingNotes.forEach((note, i) => {
                if (mongoose.Types.ObjectId(noteId).equals(note._id)) {
                    existingNotes.splice(i, 1);
                }
            });
        }

        station.save(function (err) {
            if (err) {
                console.log("there was an err", err);
            }
            return res.json();
        });
    });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    const post = await stationModel.findById(id);
    const updatedPost = await stationModel.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
    );
    res.json(updatedPost);
};

// export const deleteStationNote = async (req, res) => {
//     // extracting id from req.params
//     const { id, noteId } = req.params;
//     const updatedStationInfo = req.body;
//     console.log("REQ - id", updatedStationInfo);

//     // console.log(updatedStationInfo);

//     // checking if the id is valid in the mongoose db, if it's not valid just return a status saying nothings returned
//     if (!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).send("No post with that id");

//     // stationModel.findById(id, function (err, station) {
//     //     if (station.length === 0) return res.json();

//     //     const existingNotes = station.notes;

//     //     console.log("existing notes", existingNotes);
//     //     // station.save(function (err) {
//     //     //     if (err) {
//     //     //         console.log("there was an err", err);
//     //     //     }
//     //     //     return res.json();
//     //     // });
//     // });
// };
