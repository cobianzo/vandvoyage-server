import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchTTCLineOne = createAsyncThunk(
    "ttcLineOne/fetchTTCLineOne",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/ttclineone`);
        //bike data is long then lat, but it needs to be lat then long for leaflet polylines

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

const ttcLineOneSlice = createSlice({
    name: "ttcLineOne",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchTTCLineOne.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchTTCLineOne.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchTTCLineOne.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllTTCLineOne = (state) => state.ttcLineOne.list;
export const getAllTTCLineOneStatus = (state) => state.ttcLineOne.status;

export default ttcLineOneSlice.reducer;
