import mongoose from "mongoose";

const ttcLinesSchema = new mongoose.Schema({
    _id: Number,
    type: String,
    properties: Object,
    geometry: Object,
});

const ttcLineOneModel = mongoose.model(
    "ttc-line-one-polylines",
    ttcLinesSchema
);
const ttcLineTwoModel = mongoose.model(
    "ttc-line-two-polylines",
    ttcLinesSchema
);
const ttcLineThreeModel = mongoose.model(
    "ttc-line-three-polylines",
    ttcLinesSchema
);
const ttcLineFourModel = mongoose.model(
    "ttc-line-four-polylines",
    ttcLinesSchema
);

export {
    ttcLineOneModel,
    ttcLineTwoModel,
    ttcLineThreeModel,
    ttcLineFourModel,
};
