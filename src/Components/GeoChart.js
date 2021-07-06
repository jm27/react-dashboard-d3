import React, { useState, useEffect, useRef } from "react";
import useResizeObserver from "../Custom-Hooks/useResizeObserver";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";

// // Create state for data
const GeoChart = ({ data, property }) => {
  // Create ref
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // Create state for selected country
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const minProp = min(
      data.features,
      (feature) => feature.properties[property]
    );
    const maxProp = max(
      data.features,
      (feature) => feature.properties[property]
    );
    // Set color scale
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", "red"]);

    // use resized dimensions
    // fallback to getBoundingClientRect, if no dimensions.
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator()
      .fitSize([width, height], selectedCountry || data)
      .precision(100); // Projects geo-coordinates on a 2d plane

    // Takes geojson data, transforms that into d attribute of a path
    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .on("click", (e, feature) => {
        console.log(feature);
        setSelectedCountry(selectedCountry === feature ? null : feature);
      })
      .attr("class", "country")
      .transition()
      .duration(800)
      .attr("fill", (feature) => colorScale(feature.properties[property]))
      .attr("d", (feature) => pathGenerator(feature));

    // Display text
    svg
      .selectAll(".label")
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        (feature) =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25);
  }, [data, dimensions, property, selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GeoChart;
