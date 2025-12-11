import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchLakeshoreEastLine = createAsyncThunk(
    "goLineLakeshoreEast/fetchLakeshoreEastLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golineslakeshoreeast`
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

const lakeshoreEastLineSlice = createSlice({
    name: "goLineLakeshoreEast",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchLakeshoreEastLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchLakeshoreEastLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchLakeshoreEastLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllLakeshoreEastLines = (state) =>
    state.goLineLakeshoreEast.list;
export const getAllLakeshoreEastLinesStatus = (state) =>
    state.goLineLakeshoreEast.status;

export default lakeshoreEastLineSlice.reducer;
