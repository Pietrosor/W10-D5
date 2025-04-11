import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SearchCity from "./components/SearchCity"
import WeatherCards from "./components/WeatherCards"
import WeatherInfo from "./components/WeatherInfo"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  const cities = ["Roma", "New York", "Napoli", "Madrid", "Berlino"]
  const [selectedCity, setSelectedCity] = useState(null)
  const [weatherData, setWeatherData] = useState({})
  const [recentCities, setRecentCities] = useState([])
  const [cityImage, setCityImage] = useState("")

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities")) || []
    setRecentCities(storedCities)
  }, [])

  useEffect(() => {
    const apiKey = "9cd06bf3c70f593dec0dca2445b9cb49"

    const fetchWeather = async () => {
      try {
        const weatherInfo = {}
        await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            )
            const data = await response.json()
            weatherInfo[city] = data
          })
        )
        setWeatherData(weatherInfo)
      } catch (error) {
        console.error("Errore nel recupero dei dati meteo:", error)
      }
    }

    fetchWeather()
  }, [])

  const fetchCityImage = async (city) => {
    const apiKey = "LA_TUA_UNSPLASH_API_KEY" // Sostituisci con la tua API Key
    const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.results[0]?.urls?.regular || ""
    } catch (error) {
      console.error("Errore nel recupero dell'immagine:", error)
      return ""
    }
  }

  const handleSelectCity = async (city) => {
    setSelectedCity(city)
    const imageUrl = await fetchCityImage(city)
    setCityImage(imageUrl)
  }

  const handleSearch = async (newCity) => {
    if (!newCity) return

    const apiKey = "9cd06bf3c70f593dec0dca2445b9cb49"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Errore nella risposta dell'API")
      }
      const data = await response.json()

      setWeatherData((prevData) => ({
        ...prevData,
        [newCity]: data,
      }))

      const storedCities =
        JSON.parse(localStorage.getItem("recentCities")) || []
      const updatedCities = [
        newCity,
        ...storedCities.filter((city) => city !== newCity),
      ].slice(0, 3)
      localStorage.setItem("recentCities", JSON.stringify(updatedCities))
      setRecentCities(updatedCities)
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main
        className="d-flex flex-column justify-content-center align-items-center flex-grow-1 mt-0"
        style={{
          width: "100vw",
          textAlign: "center",
          minHeight: "150vh",
          marginTop: "0",
        }}
      >
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <SearchCity onSearch={handleSearch} />
          {recentCities.length > 0 && (
            <div className="mt-4">
              <h5>Ultime Ricerche:</h5>
              <div className="d-flex justify-content-center">
                {recentCities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(city)}
                    className="btn btn-outline-primary mx-2"
                    style={{
                      cursor: "pointer",
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
          <WeatherCards
            weatherData={weatherData}
            onSelectCity={handleSelectCity}
          />
          <WeatherInfo
            weatherData={weatherData}
            selectedCity={selectedCity}
            cityImage={cityImage}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
