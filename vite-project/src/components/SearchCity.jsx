import React, { useState } from "react"

const SearchCity = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="text-center mb-4">
      <input
        type="text"
        placeholder="Cerca una città e premi Invio"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-control"
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "0.5rem",
          fontSize: "1.2rem",
        }}
      />
    </div>
  )
}

export default SearchCity
