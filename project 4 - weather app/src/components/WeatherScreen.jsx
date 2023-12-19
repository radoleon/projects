import React, {useState, useEffect} from "react";
import plusIcon from "../icons/plus.svg";

export default function WeatherScreen({data, saveLoc}) {

    function getAbrivation(string) {
        if (string.length > 14) {
            return string.match(/[A-Z]/g).join('');
        }
        else {return string}
    }

    return (
        <div className="weather-screen">
            <div className="location-info">
                <h1 className="city">{getAbrivation(data.location.name)}</h1>
                <h2 className="state">{getAbrivation(data.location.country)}</h2>
            </div>
            <div className="weather-info">
                <h1 className="temperature">{Math.round(data.current.temp_c)}<span className="celsius">°C</span></h1>
                <h2 className="condition">{data.current.condition.text}</h2>
            </div>
            <div className="additional-info">
                <div className="feels">
                    <h3>{Math.round(data.current.feelslike_c)} °C</h3>
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                    <h3>{Math.round(data.current.humidity)} %</h3>
                    <p>Humidity</p>
                </div>
                <div className="wind">
                    <h3>{Math.round(data.current.wind_kph)} kph</h3>
                    <p>Wind</p>
                </div>
            </div>
            <div className="add-location-btn-container">
                <button
                    type="button" 
                    className="add-location-btn"
                    onClick={() => saveLoc(getAbrivation(data.location.name), getAbrivation(data.location.country))}
                >
                    <img className="btn-img" src={plusIcon.toString()}></img>
                    <span className="btn-text">Save this location</span>
                </button>
            </div>
        </div>
    )
}