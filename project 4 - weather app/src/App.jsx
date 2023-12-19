import React, {useState, useEffect} from "react";
import Form from "./components/Form";
import WeatherScreen from "./components/WeatherScreen";
import IntroScreen from "./components/IntroScreen";
import images from "./imagesData";
import {nanoid} from "nanoid"

export default function App() {
    const [location, setLocation] = useState("")
    const [weatherData, setWeatherData] = useState({})
    const [currentLoc, setCurrentLoc] = useState("")
    const [savedLocs, setSavedLocs] = useState(
        JSON.parse(localStorage.getItem("SAVED_LOCATIONS")) || []
    )

    useEffect(() => {
        if (location !== "") {
            fetch(`http://api.weatherapi.com/v1/current.json?key=681a316a6050493ea60153317232107&q=${location}`)
                .then(response => response.json())
                .then(data => setWeatherData(data))
        }

        let index = Math.floor(Math.random() * images.length)
        document.body.style.backgroundImage = `url(${images[index]})`

    }, [location])

    useEffect(() => {
        localStorage.setItem("SAVED_LOCATIONS", JSON.stringify(savedLocs))
    }, [savedLocs])

    function newLocation(event) {
        event.preventDefault()
        setLocation(currentLoc)
        setCurrentLoc("")
    }

    function updateLoc(event) {
        setCurrentLoc(event.target.value)
    }

    function backToHome() {
        setLocation("")
    }

    function addToSaved (name, country) {
        setSavedLocs(prevSavedLocs => {
            for (let loc of prevSavedLocs) {
                if (name === loc.name) {
                    prevSavedLocs = prevSavedLocs.filter(item => item !== loc)
                    prevSavedLocs.unshift(loc)
                    return prevSavedLocs
                }
            }
            return [{
                name: name,
                country: country,
                id: nanoid()
            }, ...prevSavedLocs]
        })
    }

    function removeLoc(id) {
        setSavedLocs(prevLocs => {
            return prevLocs.filter(item => item.id !== id)
        })
    }

    function searchLoc(location) {
        setSavedLocs(prevLocs => {
            prevLocs = prevLocs.filter(item => item !== location)
            prevLocs.unshift(location)
            return prevLocs
        })

        setLocation(location.name)
    }

    return (
        <main className="weather-app container">
            <Form 
                handleSubmit={newLocation}
                handleChange={updateLoc}
                handleBackToHome={backToHome}
                currentLoc={currentLoc}
            />
            {
                (location === "")
                ?
                <IntroScreen 
                    savedLocs={savedLocs} 
                    removeLoc={removeLoc}
                    searchLoc={searchLoc}
                />
                :
                (
                    location !== "" && weatherData.location
                    ?
                    <WeatherScreen data={weatherData} saveLoc={addToSaved} />
                    :
                    <h1 className="location-error">Enter Valid Location!</h1>
                )
            }
        </main>
    )
}