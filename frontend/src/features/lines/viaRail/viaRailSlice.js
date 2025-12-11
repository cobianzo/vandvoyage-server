import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../app/constants";

export const fetchViaRail = createAsyncThunk(
    "viaRailLines/fetchViaRail",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/viaRail`);
        if (status === 200) return data;
        console.log("error");
    }
);

const viaRailSlice = createSlice({
    name: "viaRailLines",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchViaRail.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchViaRail.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchViaRail.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllViaRail = (state) => state.viaRailLines.list;
export const getAllViaRailStatus = (state) => state.viaRailLines.status;

export default viaRailSlice.reducer;
