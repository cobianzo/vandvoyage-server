import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchWaterlooIonStage2 = createAsyncThunk(
    "waterlooIonStage2/fetchWaterlooIonStage2",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/waterlooionstagetwo`
        );
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

const waterlooIonStage2Slice = createSlice({
    name: "waterlooIonStage2",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchWaterlooIonStage2.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchWaterlooIonStage2.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchWaterlooIonStage2.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllWaterlooIonStage2 = (state) => state.waterlooIonStage2.list;
export const getAllWaterlooIonStage2Status = (state) =>
    state.waterlooIonStage2.status;

export default waterlooIonStage2Slice.reducer;
