import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchLakeshoreWestLine = createAsyncThunk(
    "goLineLakeshoreWest/fetchLakeshoreWestLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golineslakeshorewest`
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

const lakeshoreWestLineSlice = createSlice({
    name: "goLineLakeshoreWest",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchLakeshoreWestLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchLakeshoreWestLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchLakeshoreWestLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllLakeshoreWestLines = (state) =>
    state.goLineLakeshoreWest.list;
export const getAllLakeshoreWestLinesStatus = (state) =>
    state.goLineLakeshoreWest.status;

export default lakeshoreWestLineSlice.reducer;
