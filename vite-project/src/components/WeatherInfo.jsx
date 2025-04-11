import React from "react"
import { Card } from "react-bootstrap"

const WeatherInfo = ({ weatherData, selectedCity, cityImage }) => {
  if (!selectedCity || !weatherData[selectedCity]) {
    return (
      <p className="text-center">Seleziona una città per vedere i dettagli</p>
    )
  }

  const data = weatherData[selectedCity]
  const iconCode = data.weather[0]?.icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div className="text-center mt-4">
      {cityImage && (
        <img
          src={cityImage}
          alt={`Vista di ${selectedCity}`}
          className="mb-4"
          style={{
            width: "80%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
      <Card className="shadow-lg rounded p-3 bg-light">
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Meteo a {selectedCity}
          </Card.Title>
          <Card.Text className="d-flex justify-content-center align-items-center">
            <img
              src={iconUrl}
              alt={data.weather[0]?.description}
              style={{ width: "60px", marginRight: "10px" }}
            />
            <span style={{ fontSize: "1.2rem", color: "#555" }}>
              {data.main.temp}°C - {data.weather[0]?.description}
            </span>
          </Card.Text>
          <Card.Text style={{ fontSize: "1.2rem", color: "#555" }}>
            💧 Umidità: {data.main.humidity}%
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default WeatherInfo
