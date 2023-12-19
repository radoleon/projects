import React, {useState, useEffect} from "react";
import delIcon from "../icons/delete.svg"

export default function SavedLink({data, removeLoc, searchLoc}) {
    return (
        <div className="saved-locations-el">
            <span className="saved-locations-link" onClick={() => searchLoc(data)}>
                {data.name}, {data.country}
            </span>
            <div className="del-btn" onClick={(event) => removeLoc(event.target.id)}>
                <img id={data.id} src={delIcon.toString()} className="btn-img"></img>
            </div>
        </div>
    )
}