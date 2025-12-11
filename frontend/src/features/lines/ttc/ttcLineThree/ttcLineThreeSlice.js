import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchTTCLineThree = createAsyncThunk(
    "ttcLineThree/fetchTTCLineThree",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/ttclinethree`);
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

const ttcLineThreeSlice = createSlice({
    name: "ttcLineThree",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchTTCLineThree.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchTTCLineThree.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchTTCLineThree.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllTTCLineThree = (state) => state.ttcLineThree.list;
export const getAllTTCLineThreeStatus = (state) => state.ttcLineThree.status;

export default ttcLineThreeSlice.reducer;
