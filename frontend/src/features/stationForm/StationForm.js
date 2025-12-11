import React, { useState, useEffect } from "react";
import "../../App.css";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { HTTP_STATUS } from "../../app/constants";

import { SanitarySlider, SafetySlider } from "../../components/Slider";
import IconLabelButtons from "../../components/Button";
import OutlinedCard from "../../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import {
    updateNote,
    updateDislikeCount,
    updateLikeCount,
    updateSafetyRating,
    updateSanitaryRating,
    updateServices,
    updateWifiStrength,
    updateStationInfo,
    fetchSpecificStation,
    getSpecificStation,
    getSpecificStationStatus,
    getSpecificStationNotes,
    updateSpecificStation,
    updateSpecificStationStatus,
} from "./stationFormSlice";

const Form = ({ station }) => {
    const [currentStation, setCurrentStation] = useState(station);
    const [currentId, setCurrentId] = useState(station._id);
    const [postingInProg, setPostingInProg] = useState(true);

    const [noteText, setNoteText] = useState("");
    const [sanitaryRating, setSanitaryRating] = useState();
    const [safetyRating, setSafetyRating] = useState();
    const [servicesIncluded, setServicesIncluded] = useState();
    const [stationLiked, setStationLiked] = useState(false);
    const [stationDisliked, setStationDisliked] = useState(false);

    const dispatch = useDispatch();
    const specificStation = useSelector(getSpecificStation);
    const specificStationStatus = useSelector(getSpecificStationStatus);

    // console.log("Updating Status...", updateSpecificStationStatus);

    // run only when dispatch changes - dependency
    useEffect(() => {
        dispatch(fetchSpecificStation({ id: currentId }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(updateSanitaryRating(sanitaryRating));
    }, [sanitaryRating]);

    useEffect(() => {
        dispatch(updateSafetyRating(safetyRating));
    }, [safetyRating]);

    useEffect(() => {
        dispatch(updateServices(servicesIncluded));
    }, [servicesIncluded]);

    useEffect(() => {
        dispatch(updateLikeCount(stationLiked));
    }, [stationLiked]);

    useEffect(() => {
        dispatch(updateDislikeCount(stationDisliked));
    }, [stationDisliked]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateStationInfo({
                id: currentId,
                note: noteText,
                sanitaryRating: sanitaryRating,
                safetyRating: safetyRating,
                servicesIncluded: servicesIncluded,
                stationLiked: stationLiked,
                stationDisliked: stationDisliked,
            })
        )
            .then(() => dispatch(fetchSpecificStation({ id: currentId })))
            .catch(() => console.log("error"));
    };

    const average = (array) => {
        if (array.length > 1)
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        if (array.length === 1) return array[0];
        return 3;
    };
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="like-dislike-container">
                <ThumbUpAltIcon
                    fontSize="small"
                    sx={{
                        color: stationLiked
                            ? "rgb(25, 118, 210)"
                            : "rgb(51, 51, 51)",
                    }}
                    onClick={() => setStationLiked(!stationLiked)}
                />
                <ThumbDownAltIcon
                    fontSize="small"
                    sx={{
                        color: stationDisliked
                            ? "rgb(25, 118, 210)"
                            : "rgb(51, 51, 51)",
                    }}
                    onClick={() => setStationDisliked(!stationDisliked)}
                />
            </div>

            <IconLabelButtons
                updateServicesIncluded={(services) =>
                    setServicesIncluded(services)
                }
            />

            <h3 className="popup-sub-heading">Sanitary Level</h3>
            <SanitarySlider
                rating={average(station.sanitaryRating)}
                updateSanitaryRating={(rating) => setSanitaryRating(rating)}
            />

            <h3 className="popup-sub-heading">Safety Level</h3>
            <SafetySlider
                rating={average(station.safetyRating)}
                updateSafetyRating={(rating) => setSafetyRating(rating)}
            />

            <TextField
                sx={{ marginTop: 1 }}
                className="text-box-notes"
                label="Notes"
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => setNoteText(e.target.value)}
            />

            <div className="submit-button-container">
                <Button
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon />}
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
            </div>

            {specificStationStatus !== HTTP_STATUS.FULFILLED
                ? station.notes.map((note, i) => (
                      <OutlinedCard
                          key={note._id}
                          note={note}
                          id={currentId}
                          noteId={note._id}
                      />
                  ))
                : specificStation.notes.map((note, i) => (
                      <OutlinedCard
                          key={note._id}
                          note={note}
                          id={currentId}
                          noteId={note._id}
                      />
                  ))}
        </form>
    );
};

export default Form;
