import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchUnionPearsonLine = createAsyncThunk(
    "goLineUnionPearson/fetchUnionPearsonLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golinesunionpearson`
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

const UnionPearsonLineSlice = createSlice({
    name: "goLineUnionPearson",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchUnionPearsonLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchUnionPearsonLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchUnionPearsonLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllUnionPearsonLines = (state) => state.goLineUnionPearson.list;
export const getAllUnionPearsonLinesStatus = (state) =>
    state.goLineUnionPearson.status;

export default UnionPearsonLineSlice.reducer;
