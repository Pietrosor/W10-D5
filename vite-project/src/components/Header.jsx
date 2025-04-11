import React from "react"
import { Navbar, Container } from "react-bootstrap"
import { BsCloudSun } from "react-icons/bs"

const Header = () => {
  return (
    <Navbar
      variant="dark"
      className="w-100 shadow"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: "blue",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Navbar.Brand className="d-flex align-items-center">
          <BsCloudSun size={30} className="me-2 text-warning" />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            App Meteo
          </span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
