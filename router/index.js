import express from "express";
import {
    getStations,
    updateStationInfo,
    getSpecificStation,
} from "../controllers/stations.controller.js";
import { getBikeRoutes } from "../controllers/bikeRoutes.controller.js";
import {
    getTTCLineOne,
    getTTCLineTwo,
    getTTCLineThree,
    getTTCLineFour,
} from "../controllers/ttcLines.controller.js";

import { getLive } from "../controllers/live.controller.js";

import {
    getGoLineBarrie,
    getGoLineKitchener,
    getGoLineLSEast,
    getGoLineLSWest,
    getGoLineMilton,
    getGoLineRH,
    getGoLineStouffville,
    getGoLineUP,
} from "../controllers/goLines.controller.js";

import {
    getWaterlooIonLine,
    getWaterlooIonLineStageTwo,
} from "../controllers/waterlooIonLines.controller.js";

import { getViaRail } from "../controllers/viaRail.controller.js";

const stationsRouter = express.Router();
const bikeRoutesRouter = express.Router();
const viaRailRouter = express.Router();

const ttcLineOneRouter = express.Router();
const ttcLineTwoRouter = express.Router();
const ttcLineThreeRouter = express.Router();
const ttcLineFourRouter = express.Router();

const liveRouter = express.Router();

const goLinesBarrieRouter = express.Router();
const goLinesKitchenerRouter = express.Router();
const goLinesLSEastRouter = express.Router();
const goLinesLSWestRouter = express.Router();
const goLinesMiltonRouter = express.Router();
const goLinesRHRouter = express.Router();
const goLinesStouffvilleRouter = express.Router();
const goLinesUPRouter = express.Router();

const waterlooIonRouter = express.Router();
const waterlooIonStageTwoRouter = express.Router();

stationsRouter.get("/", getStations);
stationsRouter.get("/:id", getSpecificStation);
stationsRouter.put("/:id", updateStationInfo);

bikeRoutesRouter.get("/", getBikeRoutes);

viaRailRouter.get("/", getViaRail);

ttcLineOneRouter.get("/", getTTCLineOne);
ttcLineTwoRouter.get("/", getTTCLineTwo);
ttcLineThreeRouter.get("/", getTTCLineThree);
ttcLineFourRouter.get("/", getTTCLineFour);

liveRouter.get("/", getLive);

goLinesBarrieRouter.get("/", getGoLineBarrie);
goLinesKitchenerRouter.get("/", getGoLineKitchener);
goLinesLSEastRouter.get("/", getGoLineLSEast);
goLinesLSWestRouter.get("/", getGoLineLSWest);
goLinesMiltonRouter.get("/", getGoLineMilton);
goLinesRHRouter.get("/", getGoLineRH);
goLinesStouffvilleRouter.get("/", getGoLineStouffville);
goLinesUPRouter.get("/", getGoLineUP);

waterlooIonRouter.get("/", getWaterlooIonLine);
waterlooIonStageTwoRouter.get("/", getWaterlooIonLineStageTwo);

export {
    stationsRouter,
    bikeRoutesRouter,
    viaRailRouter,
    ttcLineOneRouter,
    ttcLineTwoRouter,
    ttcLineThreeRouter,
    ttcLineFourRouter,
    liveRouter,
    goLinesBarrieRouter,
    goLinesKitchenerRouter,
    goLinesLSEastRouter,
    goLinesLSWestRouter,
    goLinesMiltonRouter,
    goLinesRHRouter,
    goLinesStouffvilleRouter,
    goLinesUPRouter,
    waterlooIonRouter,
    waterlooIonStageTwoRouter,
};
