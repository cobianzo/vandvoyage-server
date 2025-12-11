import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../app/constants";

export const fetchStations = createAsyncThunk(
    "stations/fetchStations",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/stations`);
        // sort stations on data return
        if (status === 200) {
            data.sort((a, b) => {
                return a.stationName.trim().localeCompare(b.stationName.trim());
            });
            return data;
        }
        console.log("error");
    }
);

const stationsSlice = createSlice({
    name: "stations",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchStations.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchStations.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchStations.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllStations = (state) => state.stations.list;
export const getAllStationsStatus = (state) => state.stations.status;

export default stationsSlice.reducer;
