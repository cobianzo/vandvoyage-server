import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { getAllTTCLineOneStatus } from "../features/lines/ttc/ttcLineOne/ttcLineOneSlice";
import { getAllTTCLineTwoStatus } from "../features/lines/ttc/ttcLineTwo/ttcLineTwoSlice";
import { getAllTTCLineThreeStatus } from "../features/lines/ttc/ttcLineThree/ttcLineThreeSlice";
import { getAllTTCLineFourStatus } from "../features/lines/ttc/ttcLineFour/ttcLineFourSlice";

import { getAllBarrieLinesStatus } from "../features/lines/goTransit/barrieLine/barrieLineSlice";
import { getAllKitchenerLinesStatus } from "../features/lines/goTransit/kitchenerLine/kitchenerLineSlice";
import { getAllLakeshoreEastLinesStatus } from "../features/lines/goTransit/lakeshoreEastLine/lakeshoreEastLineSlice";
import { getAllLakeshoreWestLinesStatus } from "../features/lines/goTransit/lakeshoreWestLine/lakeshoreWestLineSlice";
import { getAllMiltonLinesStatus } from "../features/lines/goTransit/miltonLine/miltonLineSlice";
import { getAllRichmondHillLinesStatus } from "../features/lines/goTransit/richmondHillLine/richmondHillLineSlice";
import { getAllStouffvilleLinesStatus } from "../features/lines/goTransit/stouffvilleLine/stouffvilleLineSlice";
import { getAllUnionPearsonLinesStatus } from "../features/lines/goTransit/unionPearsonLine/unionPearsonLineSlice";
import { getAllBikeRoutesStatus } from "../features/lines/torontoBikeRoutes/bikeRoutesSlice";

import { getAllViaRailStatus } from "../features/lines/viaRail/viaRailSlice";

import { getAllWaterlooIonCurrentStatus } from "../features/lines/waterlooIon/waterlooIonCurrent/waterlooIonCurrentSlice";
import { getAllWaterlooIonStage2Status } from "../features/lines/waterlooIon/waterlooIonStage2/waterlooIonStage2Slice";

import { HTTP_STATUS } from "../app/constants";

const Modal = () => {
    const ttcLineOneStatus = useSelector(getAllTTCLineOneStatus);
    const ttcLineTwoStatus = useSelector(getAllTTCLineTwoStatus);
    const ttcLineThreeStatus = useSelector(getAllTTCLineThreeStatus);
    const ttcLineFourStatus = useSelector(getAllTTCLineFourStatus);

    const barrieLineStatus = useSelector(getAllBarrieLinesStatus);
    const kitchenerLineStatus = useSelector(getAllKitchenerLinesStatus);
    const lakeshoreEastLineStatus = useSelector(getAllLakeshoreEastLinesStatus);
    const lakeshoreWestLineStatus = useSelector(getAllLakeshoreWestLinesStatus);
    const miltonLineStatus = useSelector(getAllMiltonLinesStatus);
    const richmondHillLineStatus = useSelector(getAllRichmondHillLinesStatus);
    const stouffvilleLineStatus = useSelector(getAllStouffvilleLinesStatus);
    const unionPearsonLineStatus = useSelector(getAllUnionPearsonLinesStatus);

    const bikeRoutesStatus = useSelector(getAllBikeRoutesStatus);

    const viaRailStatus = useSelector(getAllViaRailStatus);
    const waterlooIonStage2Status = useSelector(getAllWaterlooIonStage2Status);
    const waterlooIonCurrentStatus = useSelector(
        getAllWaterlooIonCurrentStatus
    );

    const [display, setDisplay] = useState("");
    const [opacity, setOpacity] = useState(0.8);

    const toggleVisibility = () => {
        if (display === "none") {
            setDisplay("");
            setOpacity(1);
        } else {
            setOpacity(0);
            setTimeout(() => setDisplay("none"), 3000);
        }
    };

    return (
        <>
            {ttcLineOneStatus !== HTTP_STATUS.FULFILLED ||
            ttcLineTwoStatus !== HTTP_STATUS.FULFILLED ||
            ttcLineThreeStatus !== HTTP_STATUS.FULFILLED ||
            ttcLineFourStatus !== HTTP_STATUS.FULFILLED ||
            barrieLineStatus !== HTTP_STATUS.FULFILLED ||
            kitchenerLineStatus !== HTTP_STATUS.FULFILLED ||
            lakeshoreEastLineStatus !== HTTP_STATUS.FULFILLED ||
            lakeshoreWestLineStatus !== HTTP_STATUS.FULFILLED ||
            miltonLineStatus !== HTTP_STATUS.FULFILLED ||
            richmondHillLineStatus !== HTTP_STATUS.FULFILLED ||
            stouffvilleLineStatus !== HTTP_STATUS.FULFILLED ||
            unionPearsonLineStatus !== HTTP_STATUS.FULFILLED ||
            bikeRoutesStatus !== HTTP_STATUS.FULFILLED ||
            viaRailStatus !== HTTP_STATUS.FULFILLED ||
            waterlooIonStage2Status !== HTTP_STATUS.FULFILLED ||
            waterlooIonCurrentStatus !== HTTP_STATUS.FULFILLED ? (
                <div className="modal" style={{ opacity, display }}>
                    <div className="modal-loading-container">
                        <div className="modal-loading-image "></div>
                    </div>
                </div>
            ) : (
                setTimeout(() => {
                    setOpacity(0);
                }, 1000) &&
                setTimeout(() => {
                    setDisplay("none");
                }, 1400) && (
                    <div className="modal" style={{ opacity, display }}>
                        <div className="modal-loading-container">
                            <div className="modal-loading-image "></div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};
export default Modal;
