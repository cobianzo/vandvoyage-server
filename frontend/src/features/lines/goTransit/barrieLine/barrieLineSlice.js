import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchBarrieLine = createAsyncThunk(
    "goLineBarrie/fetchBarrieLine",
    async () => {
        const { data, status } = await axios.get(`${endpoint}/golinesbarrie`);
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

const barrieLineSlice = createSlice({
    name: "goLineBarrie",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchBarrieLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchBarrieLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchBarrieLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllBarrieLines = (state) => state.goLineBarrie.list;
export const getAllBarrieLinesStatus = (state) => state.goLineBarrie.status;

export default barrieLineSlice.reducer;
