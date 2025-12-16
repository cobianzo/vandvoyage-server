import mongoose from "mongoose";

const viaRailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stop_id: String,
    stop_code: String,
    stop_name: String,
    location_type: String,
    stop_lon: String,
    stop_lat: String,
    stop_timezone: String,
    parent_station: String,
    wheelchair_boarding: String,
    coordinates: Array,
});

const viaRailModel = mongoose.model("via-rail-lines", viaRailSchema);

export { viaRailModel };
