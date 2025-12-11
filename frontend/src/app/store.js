import { configureStore } from "@reduxjs/toolkit";
import bikeRouteReducer from "../features/lines/torontoBikeRoutes/bikeRoutesSlice";
import viaRailReducer from "../features/lines/viaRail/viaRailSlice";
import ttcLineOneReducer from "../features/lines/ttc/ttcLineOne/ttcLineOneSlice";
import ttcLineTwoReducer from "../features/lines/ttc/ttcLineTwo/ttcLineTwoSlice";
import ttcLineThreeReducer from "../features/lines/ttc/ttcLineThree/ttcLineThreeSlice";
import ttcLineFourReducer from "../features/lines/ttc/ttcLineFour/ttcLineFourSlice";
import barrieLineReducer from "../features/lines/goTransit/barrieLine/barrieLineSlice";
import kitchenerLineReducer from "../features/lines/goTransit/kitchenerLine/kitchenerLineSlice";
import lakeshoreEastLineReducer from "../features/lines/goTransit/lakeshoreEastLine/lakeshoreEastLineSlice";
import lakeshoreWestLineReducer from "../features/lines/goTransit/lakeshoreWestLine/lakeshoreWestLineSlice";
import miltonLineReducer from "../features/lines/goTransit/miltonLine/miltonLineSlice";
import richmondHillLineReducer from "../features/lines/goTransit/richmondHillLine/richmondHillLineSlice";
import stouffvilleLineReducer from "../features/lines/goTransit/stouffvilleLine/stouffvilleLineSlice";
import unionPearsonLineReducer from "../features/lines/goTransit/unionPearsonLine/unionPearsonLineSlice";
import waterlooIonCurrentReducer from "../features/lines/waterlooIon/waterlooIonCurrent/waterlooIonCurrentSlice";
import waterlooIonStage2Reducer from "../features/lines/waterlooIon/waterlooIonStage2/waterlooIonStage2Slice";
import stationsReducer from "../features/markers/stationsSlice";
import stationFormReducer from "../features/stationForm/stationFormSlice";

export default configureStore({
    reducer: {
        lines: bikeRouteReducer,
        ttcLineOne: ttcLineOneReducer,
        ttcLineTwo: ttcLineTwoReducer,
        ttcLineThree: ttcLineThreeReducer,
        ttcLineFour: ttcLineFourReducer,
        goLineBarrie: barrieLineReducer,
        goLineKitchener: kitchenerLineReducer,
        goLineLakeshoreEast: lakeshoreEastLineReducer,
        goLineLakeshoreWest: lakeshoreWestLineReducer,
        goLineMilton: miltonLineReducer,
        goLineRichmondHill: richmondHillLineReducer,
        goLineStouffville: stouffvilleLineReducer,
        goLineUnionPearson: unionPearsonLineReducer,
        waterlooIonCurrent: waterlooIonCurrentReducer,
        waterlooIonStage2: waterlooIonStage2Reducer,
        viaRailLines: viaRailReducer,
        stations: stationsReducer,
        stationForm: stationFormReducer,
    },
});
