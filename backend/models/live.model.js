import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({
    operator: String,
    id: String,
    position: {
	lat: Number,
	lon: Number
    },
    delay: Number,
    timestamp: Date,
    origin: String,
    destination: String
}, { versionKey: false });

const liveModel = mongoose.model("live", liveSchema);

export { liveModel };
