import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../app/constants";

export const fetchSpecificStation = createAsyncThunk(
    "stationForm/fetchSpecificStation",
    async (updatedInfo, { rejectWithValue }) => {
        try {
            const { id } = updatedInfo;
            const { data, status } = await axios.get(
                `${endpoint}/stations/${id}`
            );
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateStationInfo = createAsyncThunk(
    "stationForm/updateStationInfo",
    async (updatedInfo, { rejectWithValue }) => {
        try {
            const { id } = updatedInfo;
            const response = await axios.put(
                `${endpoint}/stations/${id}`,
                updatedInfo
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteStationNote = createAsyncThunk(
    "stationForm/deleteStationNote",
    async (updatedInfo, { rejectWithValue }) => {
        try {
            const { id } = updatedInfo;
            const response = await axios.delete(
                `${endpoint}/stations/${id}`,
                updatedInfo
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

const initialState = {
    markerData: [],
    fetchingStatus: null,
    updatingStatus: null,
    id: null,
    dislikeCount: null,
    likeCount: null,
    safetyRating: null,
    sanitaryRating: null,
    services: null,
    wifiStrength: null,
    notes: [],
};

const stationFormSlice = createSlice({
    name: "stationForm",
    initialState,
    reducers: {
        updateNote(state, action) {
            state.notes = action.payload;
            console.log("The notes have been updated", state.notes);
        },
        updateDislikeCount(state, action) {
            state.dislikeCount = action.payload;
            console.log(
                "The dislikeCount has been updated",
                state.dislikeCount
            );
        },
        updateLikeCount(state, action) {
            state.likeCount = action.payload;
            console.log("The likeCount has been updated", state.likeCount);
        },
        updateSafetyRating(state, action) {
            state.safetyRating = action.payload;
            console.log(
                "The safetyRating has been updated",
                state.safetyRating
            );
        },
        updateSanitaryRating(state, action) {
            state.sanitaryRating = action.payload;
            console.log(
                "The sanitaryRating has been updated",
                state.sanitaryRating
            );
        },
        updateServices(state, action) {
            state.services = action.payload;
            console.log("The services has been updated", state.services);
        },
        updateWifiStrength(state, action) {
            state.wifiStrength = action.payload;
            console.log(
                "The wifiStrength has been updated",
                state.wifiStrength
            );
        },
        reset: () => initialState,
    },
    extraReducers: {
        [fetchSpecificStation.pending]: (state, action) => {
            state.fetchingStatus = HTTP_STATUS.PENDING;
        },
        [fetchSpecificStation.fulfilled]: (state, { payload }) => {
            state.markerData = payload;
            state.id = payload._id;
            state.dislikeCount = payload.dislikeCount;
            state.likeCount = payload.likeCount;
            state.safetyRating = payload.safetyRating;
            state.sanitaryRating = payload.sanitaryRating;
            state.services = payload.services;
            state.wifiStrength = payload.wifiStrength;
            state.notes = payload.notes;
            state.fetchingStatus = HTTP_STATUS.FULFILLED;
            console.log(
                "Current state",
                "\n MarkerData: ",
                state.markerData,
                "\n Id: ",
                state.id,
                "\n dislikeCount: ",
                state.dislikeCount,
                "\n likeCount: ",
                state.likeCount,
                "\n safetyRating: ",
                state.safetyRating,
                "\n sanitaryRating: ",
                state.sanitaryRating,
                "\n services: ",
                state.services,
                "\n wifiStrength: ",
                state.wifiStrength,
                "\n notes: ",
                state.notes,
                "\n status: ",
                state.fetchingStatus
            );
        },
        [fetchSpecificStation.rejected]: (state, action) => {
            state.fetchingStatus = HTTP_STATUS.REJECTED;
        },
        [updateStationInfo.pending]: (state, action) => {
            state.updatingStatus = HTTP_STATUS.PENDING;
        },
        [updateStationInfo.fulfilled]: (state, action) => {
            state.updatingStatus = HTTP_STATUS.FULFILLED;
        },
        [updateStationInfo.rejected]: (state, action) => {
            console.log(state);
            state.updatingStatus = HTTP_STATUS.REJECTED;
        },
    },
});

export const getSpecificStation = (state) => state.stationForm.markerData;
export const getSpecificStationStatus = (state) =>
    state.stationForm.fetchingStatus;
export const getSpecificStationNotes = (state) => state.stationForm.notes;

export const updateSpecificStation = (state) => state.stationForm.markerData;
export const updateSpecificStationStatus = (state) =>
    state.stationForm.updatingStatus;

export const {
    updateNote,
    updateDislikeCount,
    updateLikeCount,
    updateSafetyRating,
    updateSanitaryRating,
    updateServices,
    updateWifiStrength,
    reset,
} = stationFormSlice.actions;

export default stationFormSlice.reducer;
