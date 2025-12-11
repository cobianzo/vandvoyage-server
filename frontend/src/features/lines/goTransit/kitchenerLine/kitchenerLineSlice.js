import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchKitchenerLine = createAsyncThunk(
    "goLineKitchener/fetchKitchenerLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golineskitchener`
        );
        //data is long then lat, but it needs to be lat then long for leaflet polylines

        data.forEach((goLine) => {
            if (goLine.geometry.type === "LineString") {
                goLine.geometry.coordinates.forEach((coord) => {
                    coord.reverse();
                });
            }
        });

        if (status === 200) return data;
        console.log("error");
    }
);

const kitchenerLineSlice = createSlice({
    name: "goLineKitchener",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchKitchenerLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchKitchenerLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchKitchenerLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllKitchenerLines = (state) => state.goLineKitchener.list;
export const getAllKitchenerLinesStatus = (state) =>
    state.goLineKitchener.status;

export default kitchenerLineSlice.reducer;
