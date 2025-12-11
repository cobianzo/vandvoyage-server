import mongoose from "mongoose";

const waterlooLinesSchema = new mongoose.Schema({
    _id: Number,
    type: String,
    properties: Object,
    geometry: Object,
});

const waterlooIonLineModel = mongoose.model(
    "waterloo-ion-lines",
    waterlooLinesSchema
);
const waterlooIonLineStageTwoModel = mongoose.model(
    "waterloo-ion-stage2-lines",
    waterlooLinesSchema
);

export { waterlooIonLineModel, waterlooIonLineStageTwoModel };
