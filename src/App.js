import React, { useState } from "react";
import GeoChart from "./Components/GeoChart";
import data from "./custom.geo.json";
import "./App.css";

function App() {
  // Create state for property
  const [property, setProperty] = useState("pop_est");
  return (
    <>
      <h2>World Map</h2>
      <GeoChart data={data} property={property}></GeoChart>

      <h3>Select Property</h3>
      <select
        value={property}
        onChange={(event) => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name Length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </>
  );
}

export default App;
