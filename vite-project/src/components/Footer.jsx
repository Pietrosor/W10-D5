import React from "react"

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-3 w-100"
      style={{ position: "fixed", bottom: 0, left: 0 }}
    >
      <p>© {new Date().getFullYear()} App Meteo. </p>
    </footer>
  )
}

export default Footer
