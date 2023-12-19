import React, {useState, useEffect} from "react";
import backIcon from "../icons/back.svg"

export default function Form({handleSubmit, handleChange, currentLoc, handleBackToHome}) {
    return (
        <form onSubmit={event => handleSubmit(event)}>
            <input
                id="input-location"
                type="text"
                required
                placeholder="Enter Location" 
                onChange={event => handleChange(event)}
                value={currentLoc}
            >
            </input>
            <div className="back-btn" onClick={handleBackToHome}>
                <img src={backIcon.toString()} className="btn-img" />
            </div>
        </form>
    )
}