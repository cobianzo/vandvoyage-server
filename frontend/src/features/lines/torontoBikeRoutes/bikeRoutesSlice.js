import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../app/constants";

export const fetchBikeRoutes = createAsyncThunk(
    "lines/fetchBikeRoutes",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/bikeroutes`);
        //bike data is long then lat, but it needs to be lat then long for leaflet polylines
        data.forEach((bikeRoute) => {
            bikeRoute.coordinates.forEach((i) => {
                i.forEach((coord) => {
                    coord.reverse();
                });
            });
        });
        if (status === 200) return data;
        console.log("error");
    }
);

const bikeRoutesSlice = createSlice({
    name: "lines",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchBikeRoutes.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchBikeRoutes.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchBikeRoutes.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllBikeRoutes = (state) => state.lines.list;
export const getAllBikeRoutesStatus = (state) => state.lines.status;

export default bikeRoutesSlice.reducer;
