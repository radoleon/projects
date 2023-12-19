import React, {useState, useEffect} from "react";
import SavedLink from "./SavedLink";
import weekdays from "../weekdays";

export default function IntroScreen({savedLocs, removeLoc, searchLoc}) {

    const date = new Date

    function getGreeting(hours) {
        if (hours > 3 && hours <= 11) {
            return "Morning"
        } else if (hours > 11 && hours <= 18) {
            return "Afternoon"
        } else if (hours > 18 && hours <= 22) {
            return "Evening"
        } else {
            return "Night"
        }
    }

    const savedElements = savedLocs.map(loc => {
        return (
            <SavedLink key={loc.id} data={loc} removeLoc={removeLoc} searchLoc={searchLoc} />
        )
    })

    return (
        <div className="intro-screen">
            <h1 className="greeting">{`Good ${getGreeting(date.getHours())}!`}</h1>
            <h2 className="date">
                {`${weekdays[date.getDay()]}, ${date.toLocaleDateString("en-GB")}`}
            </h2>

            {
            savedLocs.length > 0 &&
            <div className="saved-locations">
                <h2 className="saved-locations-title">Saved Locations {`(${savedLocs.length})`}</h2>
                {savedElements}
            </div>
            }
        </div>
    )
}