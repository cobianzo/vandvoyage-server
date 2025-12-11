import mongoose from "mongoose";

const bikeRoutesSchema = new mongoose.Schema({
    _id: Number,
    OBJECTID: Number,
    INSTALLED: Number,
    STREET_NAME: String,
    FROM_STREET: String,
    TO_STREET: String,
    INFRA_LOWORDER: String,
    INFRA_HIGHORDER: String,
    Shape__Length: Number,
    type: Number,
    coordinates: Array,
});

const bikeRoutesModel = mongoose.model(
    "bike-routes-polylines",
    bikeRoutesSchema
);

export { bikeRoutesModel };
