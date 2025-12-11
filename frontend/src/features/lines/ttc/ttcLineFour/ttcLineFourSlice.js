import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchTTCLineFour = createAsyncThunk(
    "ttcLineFour/fetchTTCLineFour",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/ttclinefour`);
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

const ttcLineFourSlice = createSlice({
    name: "ttcLineFour",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchTTCLineFour.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchTTCLineFour.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchTTCLineFour.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllTTCLineFour = (state) => state.ttcLineFour.list;
export const getAllTTCLineFourStatus = (state) => state.ttcLineFour.status;

export default ttcLineFourSlice.reducer;
