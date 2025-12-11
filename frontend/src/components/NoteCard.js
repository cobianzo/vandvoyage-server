import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";

import {
    updateStationInfo,
    fetchSpecificStation,
} from "../features/stationForm/stationFormSlice";

const OutlinedCard = ({ note, id, noteId }) => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updateStationInfo({
                noteId: currentNoteId,
                id: currentId,
                type: "DELETE",
            })
        )
            .then(() => dispatch(fetchSpecificStation({ id: currentId })))
            .catch(() => console.log("error"));
    };
    const [currentId, setCurrentId] = useState(id);
    const [currentNoteId, setCurrentNoteId] = useState(noteId);
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Anonymous Alan"
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    sx={{ padding: "0px" }}
                    primary={note.creationDate.split("T")[0]}
                    secondary={note.note}
                />
                <KeyboardArrowUpIcon fontSize="small" />
                <KeyboardArrowDownIcon fontSize="small" />
                <CloseIcon onClick={(e) => handleSubmit(e)} fontSize="small" />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};
export default OutlinedCard;
