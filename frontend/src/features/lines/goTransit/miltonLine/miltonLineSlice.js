import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchMiltonLine = createAsyncThunk(
    "goLineMilton/fetchMiltonLine",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/golinesmilton`);
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

const miltonLineSlice = createSlice({
    name: "goLineMilton",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchMiltonLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchMiltonLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchMiltonLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllMiltonLines = (state) => state.goLineMilton.list;
export const getAllMiltonLinesStatus = (state) => state.goLineMilton.status;

export default miltonLineSlice.reducer;
