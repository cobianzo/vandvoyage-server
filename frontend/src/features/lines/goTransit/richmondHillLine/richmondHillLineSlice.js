import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchRichmondHillLine = createAsyncThunk(
    "goLineRichmondHill/fetchRichmondHillLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golinesrichmondhill`
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

const RichmondHillLineSlice = createSlice({
    name: "goLineRichmondHill",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchRichmondHillLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchRichmondHillLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchRichmondHillLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllRichmondHillLines = (state) => state.goLineRichmondHill.list;
export const getAllRichmondHillLinesStatus = (state) =>
    state.goLineRichmondHill.status;

export default RichmondHillLineSlice.reducer;
