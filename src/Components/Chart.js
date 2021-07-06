import { React, useState, useEffect, useRef } from "react";
import { select } from "d3";

const Chart = () => {
  // Create state for data
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  // Create ref
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div>
      {/* <h2>Hello</h2> */}
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 35))}>
        Filter Data
      </button>
    </div>
  );
};

export default Chart;
