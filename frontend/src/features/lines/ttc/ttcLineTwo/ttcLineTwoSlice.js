import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchTTCLineTwo = createAsyncThunk(
    "ttcLineTwo/fetchTTCLineTwo",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/ttclinetwo`);
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

const ttcLineTwoSlice = createSlice({
    name: "ttcLineTwo",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchTTCLineTwo.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchTTCLineTwo.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchTTCLineTwo.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllTTCLineTwo = (state) => state.ttcLineTwo.list;
export const getAllTTCLineTwoStatus = (state) => state.ttcLineTwo.status;

export default ttcLineTwoSlice.reducer;
