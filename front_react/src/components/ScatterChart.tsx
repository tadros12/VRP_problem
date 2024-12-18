// "use client";

// import dynamic from "next/dynamic";
import React from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";
// Dynamically import Plot to ensure client-side only rendering
// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface Coord {
  customers: number;
  x: number[];
  y: number[];
}

interface ScatterChartProps {
  coords: Coord;
  bestRoute?: number[];
}

const ScatterChart: React.FC<ScatterChartProps> = ({ coords, bestRoute}) => {
  const { x, y, customers } = coords;
  const colors = ["Depot", ...Array(customers).fill("Customer")];
  console.log(bestRoute)
  const scatterData : Data[] = bestRoute
    ? [
        {
          x: bestRoute.map((i) => x[i]),
          y: bestRoute.map((i) => y[i]),
          mode: "markers+lines",
          type: "scatter",
          marker: { size: 10, color: "blue" },
          line: { color: "orange", width: 2 },
          name: "Route",
        },
        {
          x: [x[bestRoute[0]], x[bestRoute[bestRoute.length - 1]]],
          y: [y[bestRoute[0]], y[bestRoute[bestRoute.length - 1]]],
          mode: "markers",
          marker: { size: 12, color: "red" },
          name: "Depot",
        },
      ]
    : [
        {
          x,
          y,
          mode: "markers",
          type: "scatter",
          marker: {
            size: 10,
            color: colors.map((loc) => (loc === "Depot" ? "red" : "blue")),
          },
          text: colors,
          hoverinfo: "x+y+text",
          name: "Scatter",
        },
      ];

  return (
    <div >
      <Plot
        data={scatterData}
        layout={{
          title: bestRoute ? "Best Route" : "Customer Locations",
          xaxis: { title: "X Coordinate" },
          yaxis: { title: "Y Coordinate" },
          showlegend: bestRoute? true : false,
          margin: { t: 50, l: 50, r: 50, b: 50 },
        }}
        className="w-full mb-5"
        useResizeHandler={true}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default ScatterChart;
