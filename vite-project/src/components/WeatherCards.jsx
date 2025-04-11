import React from "react"
import { Card, Container, Row, Col } from "react-bootstrap"

const WeatherCards = ({ weatherData, onSelectCity }) => {
  return (
    <Container className="text-center">
      <Row className="justify-content-center">
        {Object.keys(weatherData).map((city) => {
          const temp = weatherData[city]?.main?.temp
          const description = weatherData[city]?.weather[0]?.description

          return (
            <Col md={4} lg={3} key={city} className="mb-4">
              <Card
                onClick={() => onSelectCity(city)}
                className="shadow-lg rounded"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  border: "none",
                  backgroundColor: "#ffffff",
                  padding: "15px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                    {city}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.1rem", color: "#555" }}>
                    🌡 {temp}°C - {description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default WeatherCards
