import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoint, HTTP_STATUS } from "../../../../app/constants";

export const fetchStouffvilleLine = createAsyncThunk(
    "goLineStouffville/fetchStouffvilleLine",
    async () => {
        const { data, status } = await axios.get(
            `${endpoint}/golinesstouffville`
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

const StouffvilleLineSlice = createSlice({
    name: "goLineStouffville",
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [fetchStouffvilleLine.pending]: (state, action) => {
            state.status = HTTP_STATUS.PENDING;
        },
        [fetchStouffvilleLine.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.status = HTTP_STATUS.FULFILLED;
        },
        [fetchStouffvilleLine.rejected]: (state, action) => {
            state.status = HTTP_STATUS.REJECTED;
        },
    },
});

export const getAllStouffvilleLines = (state) => state.goLineStouffville.list;
export const getAllStouffvilleLinesStatus = (state) =>
    state.goLineStouffville.status;

export default StouffvilleLineSlice.reducer;
