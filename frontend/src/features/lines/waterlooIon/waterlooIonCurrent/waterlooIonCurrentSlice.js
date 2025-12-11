import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchWaterlooIonCurrent = createAsyncThunk(
    "waterlooIonCurrent/fetchWaterlooIonCurrent",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/waterlooion`);
        //data is long then lat, but it needs to be lat then long for leaflet polylines

        data.forEach((ttcLine) => {
            if (ttcLine.geometry.type === "LineString") {
                ttcLine.geometry.coordinates.forEach((coord) => {
                    coord.reverse();
                });
            }
        });

        if (status === 200) return data;
        console.log("error");
    }
);

const waterlooIonCurrentSlice = createSlice({
    name: "waterlooIonCurrent",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchWaterlooIonCurrent.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchWaterlooIonCurrent.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchWaterlooIonCurrent.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllWaterlooIonCurrent = (state) =>
    state.waterlooIonCurrent.list;
export const getAllWaterlooIonCurrentStatus = (state) =>
    state.waterlooIonCurrent.status;

export default waterlooIonCurrentSlice.reducer;
