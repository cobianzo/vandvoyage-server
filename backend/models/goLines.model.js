import mongoose from "mongoose";

const goLineScema = new mongoose.Schema({
    _id: Number,
    type: String,
    properties: Object,
    geometry: Object,
});

const getGoLineBarrieModel = mongoose.model("go-barrie-lines", goLineScema);
const getGoLineKitchenerModel = mongoose.model(
    "go-kitchener-lines",
    goLineScema
);
const getGoLineLSEastModel = mongoose.model(
    "go-lakeshore-east-lines",
    goLineScema
);
const getGoLineLSWestModel = mongoose.model(
    "go-lakeshore-west-lines",
    goLineScema
);
const getGoLineMiltonModel = mongoose.model("go-milton-lines", goLineScema);
const getGoLineRHModel = mongoose.model("go-richmond-hill-lines", goLineScema);
const getGoLineStouffvilleModel = mongoose.model(
    "go-stouffville-lines",
    goLineScema
);
const getGoLineUPModel = mongoose.model(
    "go-union-pearson-express-lines",
    goLineScema
);

export {
    getGoLineBarrieModel,
    getGoLineKitchenerModel,
    getGoLineLSEastModel,
    getGoLineLSWestModel,
    getGoLineMiltonModel,
    getGoLineRHModel,
    getGoLineStouffvilleModel,
    getGoLineUPModel,
};
